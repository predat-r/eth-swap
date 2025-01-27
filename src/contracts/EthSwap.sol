// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
import "./Token.sol";
contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );
    event TokensSold(address account, address token, uint amount, uint rate);
    constructor(Token _token) public {
        token = _token;
    }
    function buyTokens() public payable {
        uint amountOfTokens = msg.value * rate;
        token.transfer(msg.sender, amountOfTokens);

        require(token.balanceOf(address(this)) >= amountOfTokens);

        emit TokensPurchased(msg.sender, address(token), amountOfTokens, rate);
    }

    function sellTokens(uint _amount) public {
      require(token.balanceOf(msg.sender)>= _amount);
        uint amountOfTokens = _amount / rate;

        require(address(this).balance >= amountOfTokens);
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(amountOfTokens);

        emit TokensPurchased(msg.sender, address(token), _amount, rate);
    }
}
