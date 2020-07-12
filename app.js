const Web3 = require("web3");
const solc = require("solc");
const fs = require("fs");

const PROVIDER_URL = "https://ropsten.infura.io/v3/<PROJECT_ID>";
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
const privateKey = "<PRIVATE_KEY>";
const contractAddress = "0x71eF63f85ee1c6837E7A269dfF259A0b5425d772";

let compiledContract, ABI, BYTECODE;

function compileContract(fileName, contractName) {
    const contractCode = fs.readFileSync(fileName).toString();

    let standardCompilerInput = {
        language: "Solidity",
        sources: {
            contract: {
                content: contractCode
            }
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["abi", "evm.bytecode"]
                }
            }
        }
    };

    standardCompilerInput = JSON.stringify(standardCompilerInput);
    const output = solc.compile(standardCompilerInput);
    compiledContract = JSON.parse(output).contracts.contract[contractName];
    return compiledContract;
}

console.log(compileContract("./ArrayOfFacts.sol", "ArrayOfFacts"));

function deployContract() {
    web3.eth.accounts.wallet.add(privateKey);
    ABI = compiledContract.abi;
    BYTECODE = "0x" + compiledContract.evm.bytecode.object;

    // ==================== Comment out deploy code =================
    // let contract = new web3.eth.Contract(ABI, null, {
    //     data: BYTECODE,
    //     from: web3.eth.accounts.wallet[0].address,
    //     gas: 4600000
    // });
    //
    // return contract
    //     .deploy()
    //     .send()
    //     .then(contractInstance => {
    //       console.log("Contract created at https://ropsten.etherscan.io/address/" + contractInstance.options.address);
    //     });
    // ==============================================================
}

console.log(deployContract());

function addFact() {
    const fact = "China Grapples With Mystery Pneumonia-Like Illness 01/06/2020.";

    const contract = new web3.eth.Contract(ABI, contractAddress);

    // ==================== Comment out add fact code =================
    // return contract.methods
    //     .add(fact)
    //     .send(
    //         {
    //           from: web3.eth.accounts.wallet[0].address,
    //           gas: 4600000
    //         },
    //         (err, transactionID) => {
    //             if (err) {
    //               console.log(err);
    //             } else {
    //               console.log("Transaction Hash: https://ropsten.etherscan.io/tx/" + transactionID);
    //             }
    //         }
    //     )
    //     .then(transaction => {
    //         console.log("Transaction Information:");
    //         console.log(transaction);
    //     });
    // ===============================================================
}

//console.log(addFact());

function getFactAndCount() {
    let factIndex = 0;
    const contract = new web3.eth.Contract(ABI, contractAddress);

    contract.methods.getFact(factIndex).call().then((result) => {
        console.log(`Fact ${++factIndex}: ${result}`);
    });

    contract.methods.count().call().then((result) => {
        console.log(`Total recorded facts: ${result}`);
    });
}

console.log(getFactAndCount());
