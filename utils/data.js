const userName = [
  "jakePeralta",
  "amySantiago",
  "rosaDiaz",
  "ginaLinetti",
  "raymondHolt",
  "charlesBoyle",
  "normScully",
  "michaelHitchcock",
  "terryJeffords",
  "dougJudy",
  "adrianPimento",
];

const thoughts = [
  "Cool, cool, cool, cool, cool",
  "No doubt, no doubt, no doubt",
  "I know! A comprehensive set of rules.",
  "Why do the worst things always happen to the best people?",
  "Fine, but in protest, Im walking over there extremely slowly!",
  "Terry loves yoghurt",
  "Heists are dumb",
  "Nine nine",
  "Noice. Smort. I love you too.",
  "Chills, you guys. Literally, chills.",
];

const reactions = ["Cool", "Noice", "Toight", "Uncool", "Boo"];

const email = ["@gmail.com", "@hotmail.com", "@outlook.com", "@microsoft.com"];

const friendsArr = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => {
  const chosenUsername = `${getRandomArrItem(userName)}`;
  const index = userName.indexOf(chosenUsername);
  if (index > -1) {
    userName.splice(index, 1);
  }
  friendsArr.push(chosenUsername);
  return chosenUsername;
};

// Gets a random email
const getRandomEmail = () => `${getRandomArrItem(email)}`;

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int, createdUsername) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughText: getRandomArrItem(thoughts),
      username: createdUsername,
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = {
  getRandomUsername,
  getRandomEmail,
  // getRandomReaction,
  getRandomThoughts,
};
