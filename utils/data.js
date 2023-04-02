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

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => `${getRandomArrItem(userName)}`;

// Gets a random email
const getRandomEmail = () => `${getRandomArrItem(email)}`;

// Gets a random reaction
const getRandomReaction = (num) => {
  if (num === 1) {
    return getRandomArrItem(reactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(userName),
    });
  }
  return results;
};

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughts),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = {
  getRandomUsername,
  getRandomEmail,
  getRandomReaction,
  getRandomThoughts,
};
