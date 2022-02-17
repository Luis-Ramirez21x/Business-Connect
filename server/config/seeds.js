const db = require("./connection");
const { User, Business, Tag, Review } = require("../models");
//
//const mechanic = require('../../client/public/images/worker-gc44dbe687_1920.jpg')



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
      title: "If i were to star you guys zero...",
      description: "If i were to star you guys zero would’ve been my select because of the bad business you guys do. Stop ripping people off their money that’s not good. You just lost a potential buyer",
      userName: "Cheap_Guy",
      rating:1
    },
    {
      title: "Let me tell you something...",
      description: "This business is absolute RUBBISH!!. These blokes are moving MAD bruv. I will never work with these dodgy wankers again.",
      userName: "Greg_The_Brit",
      rating:1
    },
    {
      title: "This was the best experience I have…",
      description: "Wonderful client helping mindset. Thanks for being one of my go to for service!",
      userName: "TinkerBell",
      rating:4
    },
    {
      title: "They did exactly as advertised",
      description: "So far they are reliable and they have good customer service. I will be solicting business with them again.",
      userName: "John.Collins89",
      rating:4
    },
    {
      title: "Decent, nothing crazy",
      description: "My friend John gave me the recommendation. They were decent but you can probably find better service elsewhere",
      userName: "Boink-32",
      rating:4
    },
    {
      title: "Gary helped me and was awesome!",
      description: "All I can say is give that man a RAISE!",
      userName: "enthu-si",
      rating:4
    },


  ])
  console.log("reviews seeded");

  const companies = await Business.insertMany([
    //lawn care
    {
      name: "Chris Savage Lawn Care",
      address: "Winder, GA",
      description: "There are two ways to handle your Winder, GA landscaping. One is to do it yourself, which means you’ll need to find the time for mowing, weeding, and all the little maintenance tasks that are so easy to forget. And after you’ve done it all… well, it’s time to do it again. Or you could just call Chris Savage Lawn Care. We offer yearly contracts as well as one-off jobs to make taking care of outdoor space as easy as possible.",
      price: "$1/sqft",
      image: 'https://www.davey.com/media/2570472/lawn-mowing-heights.png?w=640',
      reviews: [reviews[0],reviews[5],reviews[6]],
      businessEmail: 'chris.lawn.care@gmail.com',
      phoneNumber: '470-282-9696'
    },
    {
      name: "Lucy's Landscaping",
      address: "Macon, GA",
      description: "We bring quality “Cutting Edge” services in design, installation and lawn maintenance to both residential and commercial properties throughout central Georgia",
      price: "$2/sqft",
      image: "https://www.weisslawnandsnow.com/wp-content/uploads/home-banner-2.jpg",
      reviews: [reviews[2],reviews[1]],
      businessEmail: 'lucy_lawns@hotmail.com',
      phoneNumber: '505-986-5689'
    },
    //construction 
    {
      name: "JOMA Construction",
      address: "Athens, GA",
      description: "Based in Athens, GA, JOMA Construction is made up of a talented team of remodeling specialists who collaborate to help businesses of all sizes create spaces that are functional, comfortable and inviting. Ultimately, our mission is 100% customer satisfaction from start to finish and we believe our Commercial divisions craftsmanship and relationships speak to that",
      price: 'Call for a quote!',
      image: "https://www.become.co/blog/wp-content/uploads/2019/03/iStock-584498720-1-1-1024x576.jpg",
      reviews: [reviews[1],reviews[8],,reviews[3]],
      businessEmail: 'Joma.construction@gmail.com',
      phoneNumber: '678-455-5254'
    },
    //mechanic
    {
      name: "Mobile Car Mechanic",
      address: "Dulth, GA",
      description: "I've been working on cars and trucks for 32 years and am a Master Technician on both domestic and Asian cars. I also have extensive experience working with European cars. I love servicing and repairing vehicles of any kind and it would be my pleasure to service your vehicle!",
      price: '$50 intial service fee',
      image: 'https://media.istockphoto.com/photos/truck-driver-picture-id1306896540?b=1&k=20&m=1306896540&s=170667a&w=0&h=yjttGCoOkWw6opxB2W4XTuRbJSIAby0sMDZcxhKVt6E=',
      reviews: [reviews[3], reviews[5],reviews[0]],
      businessEmail: 'car.felix.89@cars.net',
      phoneNumber: '469-952-9641'
      
    },
    {
      name: "DMA Automotive",
      address: "Johns Creek, GA",
      description: "DMA Automotive is here for all of your automotive repair needs in Johns Creek, GA and the nearby areas. We provide premier auto repair services for foreign and domestic vehicles of all different makes and models. Our technicians work diligently to provide top-rated auto repair services to guarantee outstanding results. ",
      price: '$20 inquiry fee',
      image: "https://cdn-ds.com/blogs-media/sites/252/2016/12/26140213/bigstock-Portrait-of-an-auto-mechanic-a-91601333_o.jpg",
      reviews: [reviews[3], reviews[4],reviews[7]],
      businessEmail: 'dma_autos@gmail.com',
      phoneNumber: '457-952-0125'
    },
    //food
    {
      name: "Italian Express Catering",
      address: "Buckhead, GA",
      description: "Restaurant and bar that serves delicious soul-food style Italian American cooking that mixes their traditional flavors and techniques with contemporary style. The restaurant’s menu is constantly changing based on the freshest ingredients that are available that season.",
      price: 'As low as $10 meals!',
      image: "https://myareanetwork-photos.s3.amazonaws.com/editorphotos/f/2416_1530273076.jpg",
      reviews: [reviews[4],reviews[1],reviews[2]],
      businessEmail: 'italy__eats.9698@outlook.com',
      phoneNumber: '986-526-9823'
    },
    {
      name: "Rays BBQ",
      address: "South Atlanta, GA",
      description: "Rays Southern Foods is a premier, full-service catering company bringing traditional smoked barbecue and delicious southern food to homes, businesses and corporate events all over Georgia. Fully licensed and insured, we have the capacity to cater everything from small gatherings to large corporate events with thousands of people.",
      price: 'As low as $5 meals!',
      image: "https://media-cdn.tripadvisor.com/media/photo-s/15/cc/92/ab/baby-beef.jpg",
      reviews: [reviews[4],reviews[8],reviews[2]],
      businessEmail: 'bbqrays.rib@outlook.com',
      phoneNumber: '504-604-9433'
    },
    //daycare
    {
      name: "Day Care Sunny Smiles",
      address: "Midtown, GA",
      description: "DSS provides alternative child care for children whos parents work non-traditional days and hours or attempting to go back to school and taking night classes Sunday through Friday 6pm to 600 am Services also available Saturdays and drop In care",
      price: '$100/day',
      image: "https://oneworldpreschools.com/wp-content/uploads/2018/08/AdobeStock_11477.jpg",
      reviews: [reviews[0],reviews[2],reviews[6],reviews[7]],
      businessEmail: 'safe_kids@outlook.com',
      phoneNumber: '506-526-0205'
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
      businesses: [companies[5]._id,companies[6]._id]
    },
    {
      name: "Mechanic",
      businesses: [companies[3]._id,companies[4]._id]
    },
    {
      name: "Landscaping",
      businesses: [companies[0]._id,companies[1]._id]
    },
    {
      name: "Construction",
      businesses: [companies[2]._id]
    },
    {
      name: "Day-Care",
      businesses: [companies[7]._id]
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
