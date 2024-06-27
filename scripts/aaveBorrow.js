/**
 * 1. Get poolAddressesProvider contract using the interface, pool address provider address, and signer
 * 2. Use it to get the pool address
 * 3. Use the pool address to retrieve the pool
 */

const { getNamedAccounts, ethers } = require("hardhat");
const { getWeth, AMOUNT } = require("./getWeth");

const main = async () => {
  await getWeth();

  const { deployer } = await getNamedAccounts();

  const signer = await ethers.provider.getSigner();

  // Lending pool address provider v3: 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e
  const pool = await getPool(signer);
  console.log("Pool address:", pool.target);

  // deposit
  const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  // approve
  await approveERC20(wethTokenAddress, pool.target, AMOUNT, signer);
  console.log("Depositing...");

  await pool.deposit(wethTokenAddress, AMOUNT, deployer, 0);
  console.log("Deposited");

  // borrow
  let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(
    pool,
    deployer
  );
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

const approveERC20 = async (
  erc20Address,
  spenderAddress,
  amountToSpend,
  account
) => {
  const erc20Token = await ethers.getContractAt(
    "IERC20",
    erc20Address,
    account
  );

  const tx = await erc20Token.approve(spenderAddress, amountToSpend);
  await tx.wait();
  console.log("Approved");
};

const getBorrowUserData = async (pool, account) => {
  console.log("executed");
  const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await pool.getUserAccountData(account);

  console.log(`You have ${totalCollateralETH} worth of ETH deposited`);
  console.log(`You have ${totalDebtETH} worth of ETH borrowed`);
  console.log(`You have ${availableBorrowsETH} worth of ETH deposited`);

  return { totalDebtETH, availableBorrowsETH };
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
