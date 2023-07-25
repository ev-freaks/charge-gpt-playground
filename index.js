import ChargeGPT from './charge-gpt.js'
import dotenv from 'dotenv'
import minimist from 'minimist'
import { createInterface } from 'readline'

const main = async (argv) => {
  const chargeGPT = new ChargeGPT(process.env.API_KEY);

  let text;

  if (argv._.length) { text = argv._.join(" ") }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function ask() {
    return new Promise(resolve => {
      readline.question('Enter input: ', input => resolve(input));
    });
  }

  const conversationId = await chargeGPT.start(argv['lang']);
  console.log(`got conversationId=${conversationId}`);

  let moveOn = true;

  do {

    if (text === undefined) {
      text = await ask();
    }

    const result = await chargeGPT.request(text);

    console.log(`> ChargeGPT: ${result.prompt}`);

    if (result['isEnd'] || result['isError']) {
      console.log(JSON.stringify(result['results'], undefined, argv['pretty'] ? 1 : undefined));
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
  if (argv['debug']) console.error(err);
  process.exit(1);
});
