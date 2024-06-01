const { getNamedAccounts } = require("hardhat");
const { getWeth } = require("./getWeth");

const main = async () => {
  await getWeth();

  const { deployer } = await getNamedAccounts();

  // Lending pool address provider v3: 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
