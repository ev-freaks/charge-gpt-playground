import ChargeGPT from './charge-gpt.js'
import dotenv from 'dotenv'
import minimist from 'minimist'
import { createInterface } from 'readline'

const main = async (argv) => {
  const chargeGPT = new ChargeGPT(process.env.API_KEY);

  let text;

  if (argv._.length) {
    text = argv._.join(" ");
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function ask() {
    return new Promise(resolve => {
      readline.question('Enter input: ', input => resolve(input));
    });
  }

  let moveOn = true;

  do {
    let result;

    if (text === undefined) {
      text = await ask();
    }

    if (argv['dry-run'] === true) {
      console.log(`will ask: "${text}"`);
      result = 'dummy response';
    } else {
      result = await chargeGPT.request(text);
    }
    console.log(result);

    if (text === "exit") {
      moveOn = false;
    }

    text = undefined;
  } while (moveOn);

  readline.close();
}

dotenv.config();
const argv = minimist(process.argv.slice(2));

main(argv).then(() => {
  console.log('done.');
  process.exit(0);
}).catch(err => {
  console.error(`ERROR: ${err.message}`);
  console.error(err);
  process.exit(1);
});
