import connectorsInit from './connectors';
import watcher from './helpers/watcher';
import parser from './helpers/parser';
import handler from './helpers/handler';

import { CONTRACTS } from './config';

connectorsInit();

async function parse(path) {
  const data = await parser.parse(path);
  const handleData = await handler.treatment(data);
  return handleData;
}

watcher.watch(CONTRACTS, (event, contractsName, contractsPath) => {
  console.log(`[${event}] (${contractsName}) - ${contractsPath}`);
  if (event === 'change') {
    parse(contractsPath).then((data) => {
      console.log(data);
    });
  }
});
