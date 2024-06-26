const { ethers, getNamedAccounts } = require("hardhat");

const AMOUNT = ethers.parseEther("0.02");

const getWeth = async () => {
  const { deployer } = await getNamedAccounts();

  const signer = await ethers.provider.getSigner();

  const iWeth = await ethers.getContractAt(
    "IWeth",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    signer
  ); // on mainnet

  const tx = await iWeth.deposit({ value: AMOUNT });
  await tx.wait();

  const wethBalance = await iWeth.balanceOf(deployer);
  console.log(`Got ${wethBalance} WETH`);
};

module.exports = { getWeth, AMOUNT };
