# Friendzoned: Social Network API

## Your Task

This API has been built to use in association with Social Media Networks. This backend application allows users to share thoughts, add friends and react to their friends thoughts.

This application has been built using express.js routing, mongoDB and Mongoose ODM.

## Installation

Download this repo to your location machine. In your command line interface (cli), navigate to the application directory and run the following commands:

```md
> run npm i
```

## Usage

Ensure you have seeded your data where required. Run the following command at the root of your project to start the application

```md
> run npm start
```

### Model Structre

**User**:

- `username`
- `email`
- `thoughts`
- `friends`

---

**Thought**:

- `thoughtText`
- `createdAt`
- `username` (The user that created this thought)
- `reactions` (These are like replies)

---

**Reaction** (SCHEMA ONLY)

- `reactionId`
- `reactionBody`
- `username`
- `createdAt`

---

## Resources

https://www.npmjs.com/package/express

https://www.npmjs.com/package/mongoose

https://www.mongodb.com/

## Link to live video demonstration

https://drive.google.com/file/d/1w00DMmGhcMc-LdUZkdkvTGtDEJO8pSRA/view
