App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    $.getJSON('../pets.json', function (data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://10.111.200.158:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  // handleAdopt: function (event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   var adoptionInstance;

  //   web3.eth.getAccounts(function (error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.Adoption.deployed().then(function (instance) {
  //       adoptionInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return adoptionInstance.adopt(petId, { from: account });
  //     }).then(function (result) {
  //       return App.markAdopted();
  //     }).catch(function (err) {
  //       console.log(err.message);
  //     });
  //   });
  // },

  initContract: function () {

    $.getJSON('ApartmentFactory.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ApartmentArtifact = data;
      App.contracts.ApartmentFactory = TruffleContract(ApartmentArtifact);

      // Set the provider for our contract
      App.contracts.ApartmentFactory.setProvider(App.web3Provider);
      // App.contracts.ApartmentFactory.deployed().then(function (instance) {
      //   console.log(instance);
      //   // return instance.createApartment(100000, 10, { from: account });
      // }).then(function (apartment) {
      //   console.log(apartment);
      // });

      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });

    $.getJSON('Apartment.json', function (data1) {
      App.contracts.Apartment = TruffleContract(data1);
      App.contracts.Apartment.setProvider(App.web3Provider);
      // App.contracts.Apartment.deployed().then(function (instance) {
      //   console.log(instance);
      // });
    });

    return App.bindEvents();
  },

  createApartment: function (event) {
    $.getJSON('ApartmentFactory.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ApartmentArtifact = data;
      App.contracts.ApartmentFactory = TruffleContract(ApartmentArtifact);
      App.contracts.ApartmentFactory.setProvider(App.web3Provider);

      // Set the provider for our contract
      web3.eth.getAccounts(function (error, accounts) {
        if (error) {
          console.log("Start");
          console.log(error);
          console.log("END");
        }

        var account = accounts[0];

        App.contracts.ApartmentFactory.deployed().then(function (instance) {
          console.log(account);

          return instance.createApartment(100000, 10, { from: account });
        }).then(function (apartment) {
          console.log(apartment);
        });
        // .catch(function (err) {
        //   console.log(err.message);
        // });

      })

      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });


  },

  bindEvents: function () {
    $(document).on('click', '.btn-createApartment', App.createApartment);
  },

  // getAllListings: function () {
  //   var listingInstance;
  //   App.contracts.Listing.deployed().then(function (instance) {
  //     listingInstance = instance;
  //     return listingInstance.getAllListings.call();
  //   }).then(function (listings) {
  //     console.log(listings);
  //   });
  // },

  // createListing: function (event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   var listingInstance;

  //   web3.eth.getAccounts(function (error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.Listing.deployed().then(function (instance) {
  //       listingInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return listingInstance.createListing(petId);
  //     }).then(function (result) {
  //       console.log(result);
  //       return App.getAllListings();
  //       // return App.markAdopted();
  //     }).catch(function (err) {
  //       console.log(err.message);
  //     });
  //   });
  // },

  // markAdopted: function () {
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function (instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   }).then(function (adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function (err) {
  //     console.log(err.message);
  //   });
  // },



};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
