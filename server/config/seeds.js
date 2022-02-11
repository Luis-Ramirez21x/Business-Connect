const db = require("./connection");
const { User, Business, Tag, Review } = require("../models");

db.once("open", async () => {
  await Tag.deleteMany({});
  await User.deleteMany({});
  await Business.deleteMany({});
  await Review.deleteMany({});

  const tags = await Tag.insertMany([
    { name: "Food" },
    { name: "Mechanic" },
    { name: "landscaping" },
  ]);

  const foodTag = await Tag.findOne({ name: "Food" });

  const user = await User.create({
    username: "TestUser",
    email: "test123@gmail.com",
    password: "easypw",
  });

  const review = await Review.create({
    title: "Great Experience",
    description: "I ate here and the food was great",
    createdByUser: user._id,
  });

  const business = await Business.create({
    name: "Joe's Pizza",
    address: "123 Easy Street",
    description: "Good Pizza",
    price: 10,
    tags: [foodTag],
    reviews: [review],
  });

  await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { myBusiness: business } },
    { new: true }
  );

  console.log("data seeded");

  process.exit();
});
