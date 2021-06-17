const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '60c21e9a3ddbdd2dd4dce245',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo quisquam, sapiente nihil officiis praesentium temporibus ad consequuntur quaerat officia, tempore cupiditate ut expedita? Voluptatibus iusto quia similique nemo facilis a?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/df0hma5nl/image/upload/v1623674262/YelpCamp/rln6ahomffkynqgql4kb.jpg',
                  filename: 'YelpCamp/rln6ahomffkynqgql4kb'
                },
                {
                  url: 'https://res.cloudinary.com/df0hma5nl/image/upload/v1623674263/YelpCamp/oddjyzhylj2ofsbckeg9.jpg',
                  filename: 'YelpCamp/oddjyzhylj2ofsbckeg9'
                }
              ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})