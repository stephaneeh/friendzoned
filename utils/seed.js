const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomEmail,
  getRandomReaction,
  getRandomThoughts,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 5 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    const username = getRandomUsername();
    const email = `${username}${getRandomEmail()}`;
    const thoughts = getRandomThoughts();
    // const friends = getRandomFriends();

    users.push({
      username,
      email,
      thoughts,
      // friends,
    });
  }

  //   await User.collection.insertMany(users);
  //   await Thought.collection.insertMany(thoughts);
  // await Reaction.collection.insertMany(reactions);

  console.table(users);
  //   console.table(thoughts);
  // console.table(reactions);
  console.info("Data has been seeded");
  process.exit(0);
});
