const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;

const Thing = conn.define('thing', {
    name : {
        type: STRING
    },
    ranking: {
        type: INTEGER
    }
});

module.exports = {
    Thing
};