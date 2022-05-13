var ApartmentFactory = artifacts.require("ApartmentFactory");
var Apartment = artifacts.require("Apartment");

module.exports = function (deployer) {
    deployer.deploy(ApartmentFactory);
};

module.exports = function (deployer) {
    deployer.deploy(Apartment);
};
