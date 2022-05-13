pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ListingFactory.sol";

contract TestListing {
    ListingFactory listingInstance =
        ListingFactory(DeployedAddresses.ListingFactory());

    function testUserCanCreateListing() public {
        Listing listing = listingInstance.createListing(1, "This is test prop");

        // Assert.equal(
        //     returnedId,
        //     expectedPetId,
        //     "Adoption of the expected pet should match what is returned."
        // );
    }

    // Testing retrieval of a single pet's owner
    function testGetAllListings() public {
        Listing[] memory allListings = listingInstance.getAllListings();
        Assert.equal(allListings.length, 1, "Total listing matches");
        // require(true, string(allListings.length));
    }
}
