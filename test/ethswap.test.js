const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");
require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}
contract("EthSwap", (accounts) => {
  let token, ethswap;
  before(async () => {
    token = await Token.new();
    ethswap = await EthSwap.new(token.address);
    await token.transfer(ethswap.address, tokens("1000000"));
  });

  describe("Token deployment", async () => {
    it("Token has a name", async () => {
      const name = await token.name();
      assert.equal("DApp Token", name);
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
});
