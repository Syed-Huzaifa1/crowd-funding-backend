import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB
})

connection.connect((err) => {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Connected')
    }
})

export default connection;