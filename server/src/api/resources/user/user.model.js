import mongoose from "mongoose";
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    passwordHash: {
      required: true,
      type: String
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
      }
    ]
  },
  { timestamps: true }
);

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("passwordHash")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.passwordHash, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.passwordHash = hash;
      next();
    });
  });
});

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plaintTextPassword, this.passwordHash);
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error("Could not save user");
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintTextPassword, salt);
  }
};

export const User = mongoose.model("user", userSchema);
