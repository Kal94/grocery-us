var mongoose = require('mongoose'),
    Item = require('./models/shopping-item.schema'),
    faker = require('faker');

function seedDB(){

    for (i = 0; i < 12; i++) { 
        const data = {
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            imageurl: 'https://via.placeholder.com/150',
            description: faker.lorem.paragraph(),
            category:'Frozen Food'
        }

        Item.create(data, (err, item) => {
            if(err){
                console.log(err)
            } else {
                console.log('Created: ' + item);
            }
        })
    }
}

module.exports = seedDB;

db.shoppingitems.insertOne (
    {
        "name" : "Natural Greek Yoghurt Lactose-Free",
        "price" : 249,
        "imageurl" : "https://groceries.morrisons.com/productImages/497/497144011_0_640x640.jpg?identifier=7f4ed235253b3de6e20646c4eb9eca3a",
        "description" : "Gluten and lactose free, Greek milk, Vegetarian",
        "category" : "Dairy"
    }
)