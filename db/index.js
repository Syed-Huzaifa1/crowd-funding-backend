import mysql from 'mysql';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB
});


connection.connect();

const seedContent = fs.readFileSync('db/seeds.sql', 'utf-8');
seedContent.split(/\r?\n/).forEach(line =>  {
    connection.query(line, err => {
        if (err) throw err
    
        console.log('SQL seed completed!');
    })
});

console.log('Running seeds.....');