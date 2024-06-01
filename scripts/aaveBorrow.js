/**
 * firstly, get poolAddressesProvider contract using the interface, pool address provider address, and signer
 * use it to get the pool address
 * use the pool address to retrieve the pool
 */

const { getNamedAccounts, ethers } = require("hardhat");
const { getWeth } = require("./getWeth");

const main = async () => {
  await getWeth();

  const { deployer } = await getNamedAccounts();

  const signer = await ethers.provider.getSigner();

  // Lending pool address provider v3: 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e
  const pool = await getPool(signer);
  console.log("Pool address:", pool.target);
};

const getPool = async (account) => {
  const poolAddressesProvider = await ethers.getContractAt(
    "IPoolAddressesProvider",
    "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
    account
  );

  const poolAddress = await poolAddressesProvider.getPool();

  const pool = await ethers.getContractAt("IPool", poolAddress, account);

  return pool;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
