import ChargeGPT from './charge-gpt.js'
import dotenv from 'dotenv'

dotenv.config();

const chargeGPT = new ChargeGPT(process.env.API_KEY);


const text = 'I want to charge near Alexanderplatz, Berlin at 3pm. I need DC charger.';

chargeGPT.request(text)
  .then(result => {
    console.log(result);
    process.exit(0);
  })
  .catch(err => {
    console.error(`ERRPR: ${err.message}`);
    console.error(err);
    process.exit(1);
  });
