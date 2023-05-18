import { Web3 } from 'web3';

import {
  FACTORY_ADDRESS,
  MAX_BATCH_SIZE
} from './constants.js';

export async function getPairsBatch(
  web3: Web3,
  startIndex: number
): Promise<Array<object>> {
  // Declaring an array with fixed size of n integer elements to iterate pairs
  const pairsIterator = [...Array(MAX_BATCH_SIZE).keys()];
  // Temporary arrays to store batch results
  const pairs = new Array();
  // Every batch can support MAX_BATCH_SIZE requests
  const pairsBatch = new web3.BatchRequest();
  pairsIterator.forEach((index) => {
    const pairRequest = {
      method: 'eth_call',
      params: [
        {
          to: FACTORY_ADDRESS,
          data: web3.eth.abi.encodeFunctionSignature('allPairs(uint256)')
        }, [startIndex + index]]
    };
    const pairRequestPromise = pairsBatch.add(pairRequest);
    pairRequestPromise
      .then((result) => {
        pairs.push({ pairAddress: result as string });
      })
      .catch((error) => {
        throw new Error(error);
      });
  });
  await pairsBatch.execute();
  return pairs;
}
