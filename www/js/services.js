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

    cartObj.startNewGymPass = function(gymName,activityId, activity, price, day, time)
    {
      cartObj.gymPass = {
        gym: gymName,
        activity:  {
                    _id: activityId,
                    name: activity,
                    price: price,
                    day: day,
                    time: time
                  },
        trainer: null,
        clothes: []
      }
    }

    cartObj.setGymPassTrainer = function(trainerId, trainerName, price)
    {
      cartObj.gymPass.trainer = {
        _id: trainerId,
        name: trainerName,
        price: price
      } 
    }

    cartObj.addGymPassClothes = function( productId, clotheName, price )
    {
      cartObj.gymPass.clothes.push({_id: productId, name: clotheName, price: price})
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

    cartObj.cart.resetBoughts = function()
    {
      cartObj.cart.length = 0;
      cartObj.total_qty = 0;
      cartObj.total_amount = 0;
      cartObj.gymPass = null
    }

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
    .factory("base64",function(){
      function toDataURL(src, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function() {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.naturalHeight;
                canvas.width = this.naturalWidth;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
            };
            img.src = src;
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = src;
            }
        }
        return {
          toDataURL: toDataURL
        }
    })
    .factory("userData", function()
    {
       var container = this;
       container.user = null;
       container.createdItems = false;

       function setUser(user)
       {
          if( user == null )
          {
            container.createadItems = false
          }
          container.user = user;
       }

       function getUser()
       {
          return container.user
       }

       function getGym(gyms, gymId)
       {
          for( var i = 0; i < gyms.length; i++ )
          {
            if( gyms[i]._id == gymId )
            {
              return gyms[i]
            }
          }
       }

       function getActivity(gymPasses, gym)
       {
          for( var i = 0; i < gym.activities.length; i++ )
          {
            if( gym.activities[i]._id == gymPasses.activity._id )
            {
              return gym.activities[i]
            }
          }
          return null
       }

       function getClothes(gymPasses, gym)
       {
         var list = []
         for(var j = 0; j < gymPasses.clothes.length; j++)
         {
            for( var i = 0; i < gym.products.length; i++ )
            {
              if( gymPasses.clothes[i] == gym.products[i]._id )
              {
                list.push(gym.products[i])
              }
            }
         }
         return list;
       }

       function getTrainer(gymPasses, gym)
       {
          for( var i = 0; i < gym.trainers.length; i++ )
          {
            if( gym.trainers[i]._id == gymPasses.trainer )
            {
              return gym.trainers[i]
            }
          }
          return null
       }

       function getSupplement(supplement, gym)
       {
          for( var i = 0; i < gym.products.length; i++ )
          {
            if( gym.products[i]._id == supplement )
            {
              return gym.products[i]
            }
          }
       }
      
       function getActivityDescp(activity, gymPass)
       {
         return "Fecha y hora: " + gymPass.date
       }

        function getActivityPrice(activity)
        {
          return activity.price
        }

        function getClothesPrice(clothes)
        {
          var price = 0
          for( var i = 0; i< clothes.length; i++)
          {
            price += clothes[i].price
          }
          return price;
        }
        function getTrainerPrice(trainer)
        {
          if( trainer == null )
          {
            return 0;
          }
          return trainer.price
        }

        function getClothesDesc(clothes)
        {
          if( clothes.length == 0 )
          {
            return "Ropa: -"
          }
          var list = "Ropa: "
          for (var i = 0; i < sharedCartService.gymPass.clothes.length; i++) {
              list += sharedCartService.gymPass.clothes[i].name + " / ";
          }
          return list.slice(0, list.length - 3);
        }

        function getTrainerDesc(trainer)
        {
          if (trainer != null) {
            return "Personal trainer: " + trainer.name
          }
          return "Personal trainer: -"
        }

        function createUserBoughtItems(gyms)
        {
          if( container.createadItems || container.user == null)
          {
            return null
          }
          var bought = { passes: [], supplements: []}
          var gymPasses =  container.user.gymPasses;
          for(var i = 0; i < gymPasses.length; i++)
          {
              if( !gymPasses[i].gym || !gymPasses[i].activity ) continue;
              var gym = getGym(gyms,gymPasses[i].gym);
              var activity = gymPasses[i].activity;
              var clothes = getClothes(gymPasses[i], gym);
              var trainer = getTrainer(gymPasses[i], gym);
              bought.passes.push({
                id: gymPasses[i]._id,
                gymName: gym.name,
                activityName:  activity.description,
                description: getActivityDescp(activity, gymPasses[i]),
                clothes: getClothesDesc(clothes),
                trainer: getTrainerDesc(trainer),
                price: getActivityPrice(activity) 
                    + getTrainerPrice(trainer) 
                    + getClothesPrice(clothes),
                    qr: gymPasses[i].qrImage
              })

          }
          var supplements = container.user.supplements;
          for(var i = 0; i < supplements.length; i++)
          {
             if( !supplements[i].gym || !supplements[i].supplement ) continue;
             var gym = getGym(gyms,supplements[i].gym);
             var supplement = supplements[i].supplement;
             bought.supplements.push({
               id: supplements[i]._id,
               name: supplement.brand,
               price: supplement.price,
               quantity: supplements[i].cant,
               gymName:  gym.name,
               qr: supplements[i].qrImage
             })

          }
          container.createadItems = true
          return bought
       }

       return {
         set: setUser,
         get: getUser,
         createUserBoughtItems: createUserBoughtItems
       }
    })
