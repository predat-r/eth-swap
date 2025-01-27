const { assert } = require("chai");

const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");
require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}
contract("EthSwap", ([deployer, investor]) => {
  let token, ethswap;
  before(async () => {
    token = await Token.new();
    ethswap = await EthSwap.new(token.address);
    await token.transfer(ethswap.address, tokens("1000000"));
  });

  describe("Token deployment", async () => {
    it("Token has a name", async () => {
      const name = await token.name();
      assert.equal("HiveCoin Token", name);
    });
  });
  describe("EthSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await ethswap.name();
      assert.equal("EthSwap Instant Exchange", name);
    });

    it("EthSwap has all tokens", async () => {
      const address = await ethswap.address;

      assert.equal(
        tokens("1000000"),
        (await token.balanceOf(address)).toString()
      );
    });
  });

  describe("buy tokens", async () => {
    let result;
    before(async () => {
      result = await ethswap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });
    it("allows user to instantly purchase tokens from ethSwap for a fixed price", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));

      let ethSwapBalance;
      ethSwapBalance = await token.balanceOf(ethswap.address);
      assert.equal(ethSwapBalance.toString(), tokens("999900"));

      ethSwapBalance = await web3.eth.getBalance(ethswap.address);
      assert.equal(ethSwapBalance, web3.utils.toWei("1", "ether"));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("100").toString());
      assert.equal(event.rate.toString(), "100");
    });
  });

  describe("sell tokens", async () => {
    let result;
    before(async () => {
      await token.approve(ethswap.address, tokens("100"), { from: investor });
      result = await ethswap.sellTokens(tokens("100"), {
        from: investor,
      });
    });
    it("allows user to instantly sell tokens to ethSwap for a fixed price", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("0"));

      let ethSwapBalance;
      ethSwapBalance = await token.balanceOf(ethswap.address);
      assert.equal(ethSwapBalance.toString(), tokens("1000000"));
      ethSwapBalance = await web3.eth.getBalance(ethswap.address);
      assert.equal(ethSwapBalance, web3.utils.toWei("0", "ether"));

      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("100").toString());
      assert.equal(event.rate.toString(), "100");

      await ethswap.sellTokens(tokens('500'),{from:investor}).should.be.rejected;
    });
  });  
});
