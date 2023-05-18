import { Web3 } from 'web3';
import { getPairsBatch } from 'submodule';
const BINANCE_RPC = 'https://bsc-dataseed3.binance.org';
const rpcURL = BINANCE_RPC;
const web3 = new Web3(rpcURL);
const startIndex = 1;
// Ejecución
(async () => {
    const pairsBatch = await getPairsBatch(web3, startIndex);
    console.log(`\nPairs: \n`, pairsBatch);
})();
