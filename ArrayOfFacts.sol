pragma solidity ^0.6.0;

contract ArrayOfFacts {
    string[] private facts;
    address private contractOwner;

    constructor() public {
        contractOwner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    function add(string memory newFact) public onlyOwner {
        facts.push(newFact);
    }

    function count() view public returns (uint256) {
        return facts.length;
    }

    function getFact(uint256 index) view public returns(string memory) {
        return facts[index];
    }
}
