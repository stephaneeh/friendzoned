const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {   
    getRandomUsername,
    getRandomEmail,
    getRandomReaction,
    getRandomThoughts, 
} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 5 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = getRandomUsername();
    const thoughts = getRandomThoughts();
    

    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
        username,
        thoughts,
        assignments,
    });
  };