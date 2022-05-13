pragma solidity ^0.8.0;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ApartmentFactory {
    mapping(address => Apartment[]) apartments;

    function createApartment(uint _value, uint _tokenPrice) public returns (Apartment) {
        Apartment newApartment = new Apartment(msg.sender, _value, _tokenPrice);
        apartments[msg.sender].push(newApartment);
        return newApartment;
    }

    function getAllApartments() public view returns (Apartment[] memory) {
        return apartments[msg.sender];
    }
}

contract Apartment is ERC20 {
    uint public balance;
    uint public totalIncome;
    uint public value;
    uint public tokenPrice;
    uint public numTokens;
    mapping(address => uint) shareholders;
    mapping(address => uint) withdrawRegister;

    constructor(address _owner, uint _value, uint _tokenPrice) ERC20("ApartmentContract", "APRTM") {
        // console.log("Calling constructor of Apartment!");
        value = _value;
        tokenPrice = _tokenPrice;
        numTokens = value / tokenPrice;
        super._mint(_owner, numTokens);
        shareholders[_owner] = numTokens;
    }

    function transfer(address recipient, uint amount)
        public
        virtual
        override
        returns (bool)
    {
        if(getFundsToWithdraw(recipient) > 0){
            // console.log(getFundsToWithdraw(recipient));
            withdraw(recipient); 
        }
        if(getFundsToWithdraw(msg.sender) > 0){
            withdraw(msg.sender); 
        }

        super.transfer(recipient, amount);
        return true;
    }

    function withdraw(address recipient) private {
        require(this.balanceOf(recipient) > 0, "unauthorized");
        require(getFundsToWithdraw(recipient) > 0,
            "0 funds to withdraw"
        );
        uint fundsToWithdraw = getFundsToWithdraw(recipient);
        balance = balance - fundsToWithdraw;
        withdrawRegister[recipient] = totalIncome;
        payable(recipient).transfer(fundsToWithdraw);
    }
    
    function withdraw() public {
        withdraw(msg.sender);
    }

    function getFundsToWithdraw(address recipient) public view returns(uint){
        return (totalIncome -
            withdrawRegister[recipient]) * this.balanceOf(recipient) / 100;
    }

    receive() external payable {
        // console.log("receive");
        balance += msg.value;
        totalIncome += msg.value;
    }
}

