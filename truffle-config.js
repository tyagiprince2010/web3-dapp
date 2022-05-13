const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "behind earn voyage dinner main spoil zone nest behind seven extend bridge";

module.exports = {
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "0.0.0.0",
      port: 7545,
      network_id: "5777" // Match any network id
    },
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/33bd966916004657a9afcbbe6207dbb2");
      },
      network_id: 4,
      gas: 1,
      gasPrice: 1,
    }
  }
};
