// deploy code will go here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "check pond profit pilot young hint crash steak engage agree edge token",
  "https://rinkeby.infura.io/v3/83987da74f9f45baa87990b114a55e64"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const rootAccount = accounts[0];

  console.log("Attempting to deploy from account", rootAccount);

  const result = await new web3.eth
    .Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello world!"] })
    .send({ gas: "1000000", from: rootAccount });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
