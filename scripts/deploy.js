// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs');
async function main() {
  const Blog = await hre.ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("My blog");

  await blog.deployed();
  console.log("Blog deployed to:", blog.address);

  fs.writeFileSync('./config.js', `
    export const contractAddress = "${blog.address}"
    export const ownerAddress = "${blog.signer.address}"
  `)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});
