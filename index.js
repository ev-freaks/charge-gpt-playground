import ChargeGPT from './charge-gpt.js'
import dotenv from 'dotenv'

const main = async () => {
  const chargeGPT = new ChargeGPT(process.env.API_KEY);
  const text = 'I want to charge near Alexanderplatz, Berlin at 3pm. I need DC charger.';

  const result = await chargeGPT.request(text);
  console.log(result);
}

dotenv.config();

main().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(`ERROR: ${err.message}`);
  console.error(err);
  process.exit(1);
});
