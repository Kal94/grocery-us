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
            category:'Cereal'
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