const connection = require('../config/connection');
const { Post, Blogger } = require('../models');
const { getRandomName, getRandomTopics } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they currently exist
    let postCheck = await connection.db.listCollections({ name: 'posts' }).toArray();
    if (postCheck.length) {
      await connection.dropCollection('posts');
    }

    let bloggersCheck = await connection.db.listCollections({ name: 'bloggers' }).toArray();
    if (bloggersCheck.length) {
      await connection.dropCollection('bloggers');
    }
  // Create empty array to hold the social media bloggers
  const bloggers = [];

  // Loop 30 times -- add bloggers to the bloggers array
  for (let i = 0; i < 30; i++) {
    // Get some random topics objects using a helper function that we imported from ./data
    const topics = getRandomTopics(30);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    bloggers.push({
      first,
      last,
      github,
      email,
      topics,
    });
  }

  // Add social media bloggers to the collection and await the results
  await Blogger.collection.insertMany(bloggers);

  // Add posts to the collection and await the results
  await Post.collection.insertOne({
    PostName: 'Hairstyles',
    inPerson: false,
    bloggers: [...bloggers],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(bloggers);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
