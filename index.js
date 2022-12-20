import express from "express";
import cors from 'cors'
import Router from './router/index.js'
import checkExpiry from './utils/checkExpiry.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(Router);

checkExpiry();

app.listen(8080, () => {
    console.log('backend connected')
})
