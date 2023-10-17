const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // console.log("Mongo connection open!!!")
    })
    .catch(err => {
        console.log("OH NO mongo connection error");
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '645d325ee5a85f1cff54deda',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quam tempore cum enim, debitis dolor optio fugiat reiciendis unde sunt voluptatibus! Fugit doloribus aut, fuga sapiente provident numquam at ad?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/djd69lrn1/image/upload/v1684165210/YelpCampProject/tnynepq24lnyfl5fl1g4.jpg',
                    filename: 'YelpCampProject/tnynepq24lnyfl5fl1g4',
                },
                {
                    url: 'https://res.cloudinary.com/djd69lrn1/image/upload/v1684165215/YelpCampProject/nbnriknxt2fvufcrzkwo.jpg',
                    filename: 'YelpCampProject/nbnriknxt2fvufcrzkwo',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
