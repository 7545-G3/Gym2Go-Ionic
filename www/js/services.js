angular.module('gym2go.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('sharedCartService', ['$ionicPopup', function ($ionicPopup) {  // $ionicPopup has to be defined here

    var cartObj = {}; 			// note that this is an Cart Object. It contains product list, total qty, and total amt
    cartObj.cart = []; 		// array of product items
    cartObj.total_amount = 0; // total cart amount
    cartObj.total_qty = 0;    // total cart qty
    cartObj.gymPass = null

    cartObj.startNewGymPass = function(gymName,activity, price, day, time)
    {
      cartObj.gymPass = {
        gym: gymName,
        activity:  {
                    name: activity,
                    price: price,
                    day: day,
                    time: time
                  },
        trainer: null,
        clothes: []
      }
    }

    cartObj.setGymPassTrainer = function(trainerName, price)
    {
      cartObj.gymPass.trainer = {
        name: trainerName,
        price: price
      } 
    }

    cartObj.addGymPassClothes = function( clotheName, price )
    {
      cartObj.gymPass.clothes.push({name: clotheName, price: price})
    }

    cartObj.cart.add = function (id, image, name, price, qty,gym,date,pt,ropa) {
     /* if (cartObj.cart.find(id) != -1) {  //find() is declared in the bottom.
        // It is used to check if the product is already added to the cart or not

        //Ionic popup
        var alertPopup = $ionicPopup.alert({
          title: 'Product Already Added',
          template: 'Increase the qty from the cart'
        });

      }
      else {*/
        //insert this into cart array
        cartObj.cart.push({
          "cart_item_id": id,
          "cart_item_image": image,
          "cart_item_name": name,
          "cart_item_price": price,
          "cart_item_qty": qty,
          "cart_item_gym": gym,
          "cart_item_date": date,
          "cart_item_pt": pt,
          "cart_item_ropa": ropa
        });
        cartObj.total_qty += qty;	// increase the cartqty
        cartObj.total_amount += parseInt(price*qty);	//increase the cart amount
      //}
    };

    cartObj.cart.find = function (id) {
      var result = -1;
      for (var i = 0, len = cartObj.cart.length; i < len; i++) {   // cart.length() gives the size of product list.
        if (cartObj.cart[i].cart_item_id === id) {
          result = i;
          break;
        }
      }
      return result;
    };

    // used to delete a product
    cartObj.cart.drop = function (id) {
      var temp = cartObj.cart[cartObj.cart.find(id)]; //used to find the price and qty of the object to be deleted
      cartObj.total_qty -= parseInt(temp.cart_item_qty);  // decrements the product qty
      cartObj.total_amount -= ( parseInt(temp.cart_item_qty) * parseInt(temp.cart_item_price) ); //decrements the product amt
      cartObj.cart.splice(cartObj.cart.find(id), 1); //used to remove product from the cart array.
      //splice() is a build in function to remove an array element.

    };

    //used to increment the product qty from the cart page
    // when a  product is added to cart. You can only increment the qty.
    cartObj.cart.increment = function (id) {
      cartObj.cart[cartObj.cart.find(id)].cart_item_qty += 1;
      cartObj.total_qty += 1;
      cartObj.total_amount += ( parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price) );
    };

    // used to decrement the product qty from the cart page
    cartObj.cart.decrement = function (id) {
      cartObj.cart[cartObj.cart.find(id)].cart_item_qty -= 1;
      cartObj.total_qty -= 1;
      cartObj.total_amount -= parseInt(cartObj.cart[cartObj.cart.find(id)].cart_item_price);


      if (cartObj.total_qty == 0 || cartObj.total_amount <= 0) {
        cartObj.total_amount = 0;
        cartObj.total_qty == 0
      }

      //if qty is 0 then remove it from the cart array.
      if (cartObj.cart[cartObj.cart.find(id)].cart_item_qty <= 0) {
        cartObj.cart.splice(cartObj.cart[cartObj.cart.find(id)], 1);

      }

    };

    return cartObj;
  }])

  .factory('activityWizardService', function () {
    var self = this;
    self.currentActivity = null;

    function addGymMembership(membership) {
      if (!self.currentActivity) {
        self.currentActivity = {};
        self.currentActivity.gym = membership
      }
    }

    function addPersonalTrainer(personal) {
      self.currentActivity.personalTrainer = personal
    }

    function addClothes(clothes) {
      self.currentActivity.clothes = clothes
    }

    function getCurrentActivity() {
      return self.currentActivity
    }

    return {
      addGymMembership: addGymMembership,
      addPersonalTrainer: addPersonalTrainer,
      addClothes: addClothes,
      getCurrentActivity: getCurrentActivity
    }
  })
  .factory('serverJsonRequest',function()
  {
    function request(url, method, jsonData, success, error)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() 
        { 
          if ( xmlHttp.readyState == 4 && xmlHttp.status < 400 )
          {
            success(JSON.parse(xmlHttp.responseText));
          }
          else if( xmlHttp.readyState == 4 )
          {
            error()
          }
            
        }
        xmlHttp.open(method,url, true); // true for asynchronous
        xmlHttp.setRequestHeader('Content-type','application/json; charset=utf-8'); 
        xmlHttp.send(jsonData)
    }

    function getSendingData(url, jsonData, successCallback, errorCallback)
    {
        request(url,"GET",jsonData,successCallback,errorCallback)
    }

    function get(url,successCallback,errorCallback)
    {
        request(url,"GET",null,successCallback,errorCallback)
    }
    function put(url, jsonData, successCallback, errorCallback)
    {
        request(url,"POST",jsonData,successCallback,errorCallback)
    }

    return {
      getSendingData: getSendingData,
      get: get,
      put: put,
      gymRequests: "/gyms",
      userRequests: "/users",
      adminRequests: "/admin-users",
      baseUrl: "https://gym2go-server.herokuapp.com/api"
    }
  })
    .factory("gymData",function(){
      var container = this
      container.usingGym = null
      container.gyms = []
      function addActualWorkingGym(gym)
      {
          container.usingGym = gym
      }

      function saveGyms(gyms)
      {
          container.gyms = gyms
      }

      function getGymsList()
      {
          return container.gyms
      }

      function getActualGym()
      {
          return container.usingGym
      }
      return {
        saveGyms: saveGyms,
        addActualWorkingGym: addActualWorkingGym,
        getGymsList: getGymsList,
        getActualGym: getActualGym
      }
    })
