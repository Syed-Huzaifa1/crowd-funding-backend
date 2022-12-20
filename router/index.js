import express from "express";
import conn from '../utils/database.js'
import axios from 'axios'
import convertDonation from '../utils/convertDonation.js'


const Router = express.Router()

Router.get("/campaigns", (req, res) => {
    const query = "CALL getCampaigns()";
    conn.query(query, (err, data) => {
        if (err){
            console.log(err)
            return res.json(err)
        } else {
            return res.json(data[0]);
        }

    })
});

Router.get("/currencies", (req, res) => {
    const query = "SELECT * FROM currency"
    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return res.json(err)   
        } else {
            return res.json(data);
        }
    })
});

Router.post("/donate", async (req, res) => {
    const { name, amount, campaign_id } = req.body;
    const { id, code } = req.body.currencyInfo;
    const convertedInfo = await convertDonation(amount, code);
    const convertedDonation = convertedInfo.result;
    const conversionRate = convertedInfo.info.rate;
    console.log("res", convertedDonation, conversionRate)
    const query = `CALL addDonation('${code}', '${name}', ${convertedDonation}, ${campaign_id}, ${conversionRate}, ${id})`;
    const getCampaign = `SELECT * FROM campaigns WHERE id = ${campaign_id} LIMIT 1`;
    console.log('query',query)
    conn.query(getCampaign, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            conn.query(query, (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(data);
            })
        }
    })
});

Router.post("/fraud", async (req, res) => {
    const query = `CALL markAsFraud(?)`
    conn.query(query, req.body.id, (err, response) => {
        if (err) return res.json(err)

        return res.status(200).json(response);
    })
})

export default Router
