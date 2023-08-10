const names = [
  'Aairman',
  'Aaron',
  'Abdul',
  'AbdulKun',
  'Allie',
  'Jones',
  'Coolio',
  'Chan',
  'enter_name_here',
  'Zechariah',
  'Zi',
  'Owen',
  'Cohel',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jarem',
  'Gracie',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farisha',
  'Sarah-Ann',
  'Nathaniela',
  'Parks',
];

const appDescriptions = [
  'Celebrity Gossip',
  'Presidential Election',
  'Learn a New Skill',
  'Fashion',
  'Sports',
  'Finance Tips',
  'New Movie Releases',
  'Makeup Tips',
  'Politics',
];

// Generate a random item in a given array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a random blogger full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random topics that can be added to blogger object.
const getRandomTopics = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      topicName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions to be used in seed.js
module.exports = { getRandomName, getRandomTopics };
