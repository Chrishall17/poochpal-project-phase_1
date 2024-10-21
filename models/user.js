const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const fs = require("fs");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  petsFirstName: {
    type: String,
    required: [true, "First name is required"],
  },
  petsLastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  friends: {
    type: [String],
    default: [],
  },
  friendRequests: {
    type: [String],
    default: [],
  },
  sentFriendRequests: {
    type: [String],
    default: [],
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
},
    {
      timestamps: true

});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          console.log("Salt: ", salt);
          return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
          console.log("Hash: ", hash);
          user.password = hash;
          next();
        })
        .catch((err) => console.error(err.message));
  } else {
    return next();
  }
});

const User = mongoose.model("User", UserSchema);

// Seed data
User.collection.drop();

const usersData = [
  {
    petsFirstName: "Archie",
    petsLastName: "Hall",
    email: "archie@hall.com",
    password: "$2b$10$1xNFZD.MzQ50PA79QMs/TOhCQAa1wnih/IufG0AQ0lRKxfKg.ed7W", // password1
    friends: ["rupert@brown.com"],
    profileImage: {data: fs.readFileSync("public/images/profileUploads/profileImage+1728463794145-37158013.png", "base64"), contentType: "image/png"},
  },
  {
    petsFirstName: "Rupert",
    petsLastName: "Brown",
    email: "rupert@brown.com",
    password: "$2b$10$X1zkDaZMR7.s9PTS/IzK5eCkBkDQxdcxJa90OrwgGiPjjQ00CK.Z6", // password1
    friends: ["archie@hall.com"],
    profileImage: {data: fs.readFileSync("public/images/profileUploads/rupert+1728463794145-37158015.png", "base64"), contentType: "image/png"},
  },
  {
    petsFirstName: "Moose",
    petsLastName: "Robinson",
    email: "moose@robinson.com",
    password: "$2b$10$Zk40SU.AGeyaQctsEjwRA.cjD6pKb7kqoWDciHFpQm0zCKn4uxrt.", // password1
    friends: ["rupert@brown.com", "archie@hall.com", "sue@sue.com"],
    profileImage: {data: fs.readFileSync("public/images/profileUploads/moose+1728463794145-37158014.png", "base64"), contentType: "image/png"},
  },
  {
    petsFirstName: "Sue",
    petsLastName: "Mason",
    email: "sue@sue.com",
    password: "$2b$10$STIfhgfqBgRI7ocwv5w0ZOH6RM8aLMIdPYiC/URiqqs7NG2HEs/vO", // password1
    friends: ["alex@alex.com", "chris@chris.com", "joe@joe.com"],
  },
  {
    petsFirstName: "Susie",
    petsLastName: "Smith",
    email: "susie@susie.com",
    password: "$2b$10$YzSIz6AGYa8aM/38S4mPSuaFhBcIF9ziA0Vm2MA84ZUJBx5KVHpG.", // password1
    friends: [],
  },
  {
    petsFirstName: "Peter",
    petsLastName: "Smith",
    email: "peter@peter.com",
    password: "$2b$10$g9/cBqkFlsE.FLc1wH6kPOf0aUnKpEZjUAaxLcIP9iCOLAc0F4OAG", // password1
    friends: ["joe@joe.com"],
  },
  {
    petsFirstName: "Test",
    petsLastName: "Test",
    email: "test@test.com",
    password: "$2b$10$T7gwCG2ZcVmgB8SCaLpGf.BvTjEX70yzgbh3mPT6gZ5oS3cK/GGUq", // Testtest1
    friends: [],
  },
];

User.insertMany(usersData).then(function () {
  console.log("Successfully added users to DB!");
}).catch(function (err) {
  console.log(err);
});

module.exports = User;
