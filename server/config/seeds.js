const db = require('./connection');
const { User, Business, Tag} = require('../models');

db.once('open', async ()=>{

    await Business.deleteMany();
    const companies = await Business.insertMany([
        {
            name: "Green Landscaping",
            address: "570 Brookhaven",
            description: "asfasdfasdfas",
            price: 200,
            image: "image url here",
        },
        {
            name: "Steel Construction",
            address: "1320 Ark Bush Ct",
            description: "sjdfnaiufp",
            price: 50,
            image: "image url here",
        },
        {
            name: "Luis's Landscaping",
            address: "90 Peachtree Rd",
            description: "asfasdfasdfas",
            price: 1000,
            image: "image url here",
        },
    ])
    console.log('companies seeded');

    await User.deleteMany();

    const users = await User.insertMany([
        {
        username: "garret",
        email: "garret@garret.com",
        password: "password123",
        },
        {
            username: "aaron",
            email: "aaron@aaron.com",
            password: "password123",
            myBusiness: companies[0]
        },
        {
            username: "tina",
            email: "tina@tina.com",
            password: "password123",
            myBusiness: companies[1]
        },
        {
            username: "luis",
            email: "luis@luis.com",
            password: "password123",
            myBusiness: companies[2]
        },
    ])
    console.log('users seeded');


    await Tag.deleteMany();

    const tags = await Tag.insertMany([
        { name: 'Food'},
        { name: 'Mechanic'},
        { 
            name: 'Landscaping' ,
            businesses: [companies[0]._id, companies[2]._id]
        },
        { 
            name: 'Construction',
            businesses: companies[1]._id
        }
    ]);



    console.log('tags seeded');

    process.exit();





})
