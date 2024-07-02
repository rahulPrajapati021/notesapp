const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: "localhost",
    dialect: 'mysql'
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