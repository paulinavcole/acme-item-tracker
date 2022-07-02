const { faker } = require('@faker-js/faker');

const USERS = [];
const THINGS = [];

function createNewUser() {
    return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
};

function createNewThing() {
    return {
        name: faker.commerce.product(),
        ranking: 1,
        userId: Math.ceil(Math.random() * 10)
    };
};

Array.from({ length: 5 }).forEach(() => USERS.push(createNewUser()));
Array.from({ length: 5 }).forEach(() => THINGS.push(createNewThing()));

module.exports =  {
    USERS,
    THINGS,
    createNewUser,
    createNewThing
};