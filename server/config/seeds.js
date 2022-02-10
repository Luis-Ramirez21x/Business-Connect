const db = require('./connection');
const { User, Business, Tag} = require('../models');

db.once('open', async ()=>{

    await Tag.deleteMany();

    const tags = await Tag.insertMany([
        { name: 'Food'},
        { name: 'Mechanic'},
        { name: 'landscaping'}
    ]);

    console.log('tags seeded');

    process.exit();





})
