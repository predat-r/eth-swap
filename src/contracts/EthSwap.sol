// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
import "./Token.sol";
contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    constructor(Token _token) public {
      const amountOfTokens = msg.value * rate; 
      token = _token;
    }
}
