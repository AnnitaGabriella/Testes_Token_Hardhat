const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token ", function () {
    beforeEach(async function() {
        [owner, wallet1, wallet2, wallet] = await ethers.getSigners()
        totalSupply = 200000;
        CryptoToken = await ethers.getContractFactory("CryptoToken");
        cryptoToken = await CryptoToken.deploy(totalSupply);
        await cryptoToken.deployed();
    })
    
    it("Should should successfully deploy", async function () {
        console.log("success!");
      });
    it("Should assign the totalSupply of to the owner.", async function () {
        const crypto = await cryptoToken.balanceOf(owner.address);
        expect(await cryptoToken.totalSupply()).to.equal(crypto);
    });
    it("Should transfer tokens between accounts", async function () {
        await cryptoToken.transfer(wallet1.address, 100);
        expect(await cryptoToken.balanceOf(wallet1.address)).to.equal(100);

       await cryptoToken.connect(wallet1).transfer(wallet2.address, 100);
       expect(await cryptoToken.balanceOf(wallet2.address)).to.equal(100);
    })
    it("should not allow transaction if the balance is insufficient", async function () {
        await expect(cryptoToken.transfer(owner.address, 300000))
        .to.be.revertedWith("Insufficient Balance to Transfer");   
    })  
})