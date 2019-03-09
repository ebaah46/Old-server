const Sequelize = require('sequelize');
//const mysql = require('mysql2');

const sequelize = new Sequelize('Fast', 'root', '[password]', {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false
});
// 1: The model schema.
const Data = sequelize.define('Data', {
    oxyVal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    mqState: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    now: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

// Syncing database

sequelize.sync({ force: true }).then(() => {
    console.log("Sync complete");
}).catch((err) => {
    console.log(err);
});
module.exports = Data;