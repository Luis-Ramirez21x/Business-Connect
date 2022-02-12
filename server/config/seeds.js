const db = require("./connection");
const { User, Business, Tag, Review } = require("../models");

db.once("open", async () => {
  await Business.deleteMany({});
  await User.deleteMany({});
  await Tag.deleteMany({});
  await Review.deleteMany({});

  const reviews = await Review.insertMany([
    {
      title: "Fast and Great Pricing!",
      description: "adf fasgd gsgdg sgsdfg",
      userName: "Josh_Allen13"
    },
    {
      title: "Meh..",
      description: " gfsfdg gdfg sdf gdf gsfd",
      userName: "Lusil21xs3"
    },
    {
      title: "They gave exceptional customer service!",
      description: " gfh adfg A HSFGHS" ,
      userName: "Cheap_Guy"
    },
    {
      title: "Let me tell you something...",
      description: "&^%^%^$^*&&",
      userName: "Greg"
    },
    {
      title: "Fantastic work!",
      description: "hgfdhfgaf fad fasdf",
      userName: "TinkerBell"
    },
    {
      title: "They did exactly as advertised",
      description: "hgfdhfgaf fad fasdf adfadfafasdf",
      userName: "John.Collins89"
    },

  ])
  console.log("reviews seeded");

  const companies = await Business.insertMany([
    {
      name: "Green Landscaping",
      address: "570 Brookhaven",
      description: "asfasdfasdfas",
      price: 200,
      image: "image url here",
      reviews: [reviews[0]]
    },
    {
      name: "Steel Construction",
      address: "1320 Ark Bush Ct",
      description: "sjdfnaiufp",
      price: 50,
      image: "image url here",
      reviews: [reviews[1]]
    },
    {
      name: "Luis's Landscaping",
      address: "90 Peachtree Rd",
      description: "asfasdfasdfas",
      price: 100,
      image: "image url here",
      reviews: [reviews[2]]
    },
    {
      name: "Car Fix Felix",
      address: "967 Dunn Pkwy",
      description: "jfmfghfghs",
      price: 100,
      image: "image url here",
      reviews: [reviews[3], reviews[5]]
    },
    {
      name: "Italian Express Catering",
      address: "958 Plaza Ct ",
      description: "nhn;osfgnngsf",
      price: 20,
      image: "image url here",
      reviews: [reviews[4]]
    },
  ]);
  console.log("companies seeded");

  const users = await User.insertMany([
    {
      username: "garret",
      email: "garret@garret.com",
      password: "password123",
      myBusiness: [companies[3]._id],
    },
    {
      username: "aaron",
      email: "aaron@aaron.com",
      password: "password123",
      myBusiness: [companies[0]._id],
    },
    {
      username: "tina",
      email: "tina@tina.com",
      password: "password123",
      myBusiness: [companies[1]._id],
    },
    {
      username: "luis",
      email: "luis@luis.com",
      password: "password123",
      myBusiness: [companies[2]._id],
    },
  ]);
  console.log("users seeded");

  const tags = await Tag.insertMany([
    {
      name: "Food",
      businesses: [companies[4]._id]
    },
    {
      name: "Mechanic",
      businesses: [companies[3]._id]
    },
    {
      name: "Landscaping",
      businesses: [companies[0]._id,companies[2]._id]
    },
    {
      name: "Construction",
      businesses: [companies[1]._id]
    },
  ]);

      




  console.log("tags seeded");

  process.exit();
});
