const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("notes", "sa", "12345678", {
    host: "localhost",
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false
        }
    }
})

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database successfull')
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to database: ', error)
        return null;
    }
}

const disconnectDatabase = () => {
    sequelize.close()
    console.log("connection to database closed")
}


module.exports = {connectDatabase, disconnectDatabase, sequelize}