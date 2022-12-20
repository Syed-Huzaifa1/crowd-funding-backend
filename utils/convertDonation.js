import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const convertDonation = async (amount, from, to = 'USD') => {
    const result = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?amount=${amount}&from=${from}&to=${to}`, {
        headers: {
            apikey: process.env.API_KEY,
            "Accept-encoding": "gzip,deflate,compress",
        }
    });
    return result.data;
}

export default convertDonation;
