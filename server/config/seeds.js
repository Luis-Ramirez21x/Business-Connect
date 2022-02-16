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
      description: "I cannot say enough positive things about This business! I was in great need of this service, so I went online and found this business. From the very beginning, this business was punctual, attentive, and showed plenty effort of care with my service order. The this business associate walked me through each and every detail, time frame, and explained everything in a way that was easy to understand. Their employees are the best there are! I am truly satisfied this business.",
      userName: "Josh_Allen13",
      rating: 5
    },
    {
      title: "Meh..",
      description: "I honesty could have done the work myself.",
      userName: "Lusil21xs3",
      rating:2
    },
    {
      title: "They gave exceptional customer service!",
      description: "I cannot say enough positive things about this business! I was in great need of this service, so I went online and found this business. From the very beginning, this business was punctual, attentive, and showed plenty effort of care with my service order. The this business associate walked me through each and every detail, time frame, and explained everything in a way that was easy to understand. Their employees are the best there are! I am truly satisfied this business.",
      userName: "Cheap_Guy",
      rating:4
    },
    {
      title: "Let me tell you something...",
      description: "This business is absolute RUBBISH!!. These blokes are moving MAD bruv. I will never work with these dodgy wankers again.",
      userName: "Greg_The_Brit",
      rating:1
    },
    {
      title: "Fantastic work!",
      description: "I cannot say enough positive things about this business! I was in great need of this service, so I went online and found this business. From the very beginning, this business was punctual, attentive, and showed plenty effort of care with my service order. The this business associate walked me through each and every detail, time frame, and explained everything in a way that was easy to understand. Their employees are the best there are! I am truly satisfied this business.",
      userName: "TinkerBell",
      rating:4
    },
    {
      title: "They did exactly as advertised",
      description: "I cannot say enough positive things about this business! I was in great need of this service, so I went online and found this business. From the very beginning, this business was punctual, attentive, and showed plenty effort of care with my service order. The this business associate walked me through each and every detail, time frame, and explained everything in a way that was easy to understand. Their employees are the best there are! I am truly satisfied this business.",
      userName: "John.Collins89",
      rating:2
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
      reviews: [reviews[0]],
      businessEmail: 'green_scape@gmail.com',
      phoneNumber: '470-282-9696'
    },
    {
      name: "Steel Construction",
      address: "1320 Ark Bush Ct",
      description: "sjdfnaiufp",
      price: 50,
      image: "image url here",
      reviews: [reviews[1]],
      businessEmail: 'steel.boys@gmail.com',
      phoneNumber: '678-455-5254'
    },
    {
      name: "Luis's Landscaping",
      address: "90 Peachtree Rd",
      description: "asfasdfasdfas",
      price: 100,
      image: "image url here",
      reviews: [reviews[2]],
      businessEmail: 'lawncare_luis@hotmail.com',
      phoneNumber: '505-986-5689'
    },
    {
      name: "Car Fix Felix",
      address: "967 Dunn Pkwy",
      description: "jfmfghfghs",
      price: 100,
      image: "image url here",
      reviews: [reviews[3], reviews[5]],
      businessEmail: 'car.felix.89@cars.net',
      phoneNumber: '469-952-9641'
    },
    {
      name: "Italian Express Catering",
      address: "958 Plaza Ct ",
      description: "nhn;osfgnngsf",
      price: 20,
      image: "image url here",
      reviews: [reviews[4]],
      businessEmail: 'italy__eats.9698@outlook.com',
      phoneNumber: '986-526-9823'
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

  await User.create({
    username: "test",
    email: "test@test.com",
    password: "password123",
    myBusiness: [companies[4]._id],
    following: [companies[0]._id,companies[1]._id,companies[2]._id]
  }),
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

  await Business.findOneAndUpdate(
    {_id: companies[4]._id},
    { $addToSet: {followers: [ users[0]._id, users[1]._id],}},
    { new:true}
  );




  console.log("tags seeded");

  process.exit();
});
