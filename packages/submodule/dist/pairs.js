"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPairsBatch = void 0;
const constants_js_1 = require("./constants.js");
async function getPairsBatch(web3, startIndex) {
    // Declaring an array with fixed size of n integer elements to iterate pairs
    const pairsIterator = [...Array(constants_js_1.MAX_BATCH_SIZE).keys()];
    // Temporary arrays to store batch results
    const pairs = new Array();
    // Every batch can support MAX_BATCH_SIZE requests
    const pairsBatch = new web3.BatchRequest();
    pairsIterator.forEach((index) => {
        const pairRequest = {
            method: 'eth_call',
            params: [
                {
                    to: constants_js_1.FACTORY_ADDRESS,
                    data: web3.eth.abi.encodeFunctionSignature('allPairs(uint256)')
                }, [startIndex + index]
            ]
        };
        const pairRequestPromise = pairsBatch.add(pairRequest);
        pairRequestPromise
            .then((result) => {
            pairs.push({ pairAddress: result });
        })
            .catch((error) => {
            throw new Error(error);
        });
    });
    await pairsBatch.execute();
    return pairs;
}
exports.getPairsBatch = getPairsBatch;
