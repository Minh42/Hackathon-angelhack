pragma solidity ^0.4.22;

contract Flex {

  struct User {
      uint32 id_contract;
      uint32 id_chargingPoint;
      uint32 timestamp;
      uint32 start;
      uint32 duration;
      bool state;
      uint uniqueId;
  }
      
  uint uniqueId;
  mapping (address => User) Users;
  address[] usersByAddress;
 
  function addCustomer(address _userAddress) public returns (bool success) {
        address thisNewAddress = _userAddress;
        usersByAddress.push(thisNewAddress);
        return true;
    }   
      
  function addContract(
    uint32 id_contract,
                                  uint32 id_chargingPoint,
                                  uint32 timestamp,
                                  uint32 start,
                                  uint32 duration,
                                  bool state) public returns (bool success) {
    
    address thisNewAddress = msg.sender;
    
     Users[thisNewAddress].id_contract = id_contract;
     Users[thisNewAddress].id_chargingPoint = id_chargingPoint;
     Users[thisNewAddress].timestamp = timestamp;
     Users[thisNewAddress].start = start;
     Users[thisNewAddress].duration = duration;
     Users[thisNewAddress].state = state;
     Users[thisNewAddress].uniqueId = uniqueId;
     uniqueId++;
     usersByAddress.push(thisNewAddress);
     return true;
 }
 
 function random() private view returns (uint8) {
        return uint8(uint256(keccak256(block.timestamp, block.difficulty))%251);
    }
 
 function getUsers() public constant returns (address[]) { return usersByAddress; }

 function getUser(address userAddress) public constant returns (uint32,
                                  uint32,
                                  uint32,
                                  uint32,
                                  uint32,
                                  bool,
                                  uint) {
   return (Users[userAddress].id_contract,
           Users[userAddress].id_chargingPoint,
           Users[userAddress].timestamp,
           Users[userAddress].start,
           Users[userAddress].duration,
           Users[userAddress].state,
           Users[userAddress].uniqueId);
 }
}