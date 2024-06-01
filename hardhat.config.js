require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const { ALCHEMY_FORKED_MAINNET } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.24" },
      { version: "0.4.19" },
      { version: "0.8.0" },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: ALCHEMY_FORKED_MAINNET,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
