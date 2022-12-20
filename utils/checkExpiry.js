import cron from 'node-cron';
import conn from './database.js'

const checkExpiry = () => {
    cron.schedule('10 * * * * *', () => {
        const query = 'CALL expireCampaign()'
        conn.query(query, [], (err, res) => {
            if (err) console.log('err', err);
        })
    })   
}

export default checkExpiry;