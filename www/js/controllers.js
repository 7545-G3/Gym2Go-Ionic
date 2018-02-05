angular.module('gym2go.controllers', [])

  .controller('GymsCtrl', function ($scope,$state,$ionicPopup,serverJsonRequest,gymData)
  {
      $scope.gyms = [  ]
      $scope.successCallback = function(json)
      {
          var gyms = [{name: "Gym1", lat: -34.618634,lon:-58.369471}, 
                      {name:"Gym2", lat:-34.616321,lon:-58.368526}]
          gymData.saveGyms(gyms)
          $scope.gyms = gyms
      }
      $scope.errorCallback = function()
      {
        $ionicPopup.alert({
          title: 'Error obteniendo gimnasios'
        }).then(function(){

        });
      }
      $scope.onSelectedGym = function(gymName)
      {
         for(var index = 0; index < gymData.getGymsList().length; index++ )
         {
           if(gymData.getGymsList()[index].name == gymName )
           {
             gymData.addActualWorkingGym(gymName);
             $state.go("tab.activities");
             break;
           }
         }
         
      }
      serverJsonRequest.get(serverJsonRequest.baseUrl + serverJsonRequest.gymRequests,$scope.successCallback,$scope.errorCallback)
  })

  //Proteinas
  .controller('SuppsCtrl', function ($scope, Chats, $ionicPopup,sharedCartService, gymData) 
  {
    $scope.groups = [];
    $scope.compras={};
    $scope.gyms = ["McGym","Fiuba","Belgrano","Independencia","San Telmo"];
    $scope.data = {};
    $scope.data.index = 1;
    //global variable shared between different pages.
    var cart = sharedCartService.cart;

    $scope.groups[0] = {
      name: "Proteinas",
      items: []
    };
    $scope.groups[0].items[0] = {
      img: "img/Proteina1.jpg",
      marca: "BSN SYNTHA-6",
      peso: "1kg",
      id: 1,
      precio: 10,
      cantidad: 0
    };
    $scope.groups[0].items[1] = {
      img: "img/Proteina2.jpg",
      marca: "NitroTech",
      peso: "4lb",
      id: 2,
      precio: 10,
      cantidad: 0
    };
    $scope.groups[0].items[2] = {
      img: "img/Proteina3.jpg",
      marca: "Monster Whey",
      peso: "2,2lb",
      id: 3,
      precio: 10,
      cantidad: 0
    };

//Aminoacidos
    $scope.groups[1] = {
      name: "Aminoacidos",
      items: []
    };
    $scope.groups[1].items[0] = {
      img: "img/Aminoacido1.jpg",
      marca: "Amino",
      peso: "1kg",
      id: 4,
      precio: 10,
      cantidad: 0
    };

//Barras
    $scope.groups[2] = {
      name: "Barras Energéticas",
      items: []
    };
    $scope.groups[2].items[0] = {
      img: "img/Barra1.jpg",
      marca: "Isostar",
      peso: "15g",
      id: 5,
      precio: 10,
      cantidad: 0
    };
    //Creatina
    $scope.groups[3] = {
      name: "Creatina",
      items: []
    };
    $scope.groups[3].items[0] = {
      img: "img/Creatina1.jpg",
      marca: "CREATINA PLUS 5950",
      peso: "200g",
      id: 6,
      precio: 10,
      cantidad: 0
    };
    $scope.groups[3].items[1] = {
      img: "img/Creatina2.jpg",
      marca: "MICRONIZADA",
      peso: "1kg",
      id: 7,
      precio: 10,
      cantidad: 0
    };
    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function (group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function (group) {
      return $scope.shownGroup === group;
    };

    //add to cart function
    $scope.addToCart = function (id, image, name, price, quantity,gym) {
    $ionicPopup.confirm({
        title: 'Confirmar Compra',
        template: '<div><p>' + name + '</p><strong>Precio: $' + price + '</strong></div>',
        okText: 'Continuar',
        cancelText: 'Cancelar'
    })
    .then(function(confirmed) {
        if (confirmed) {
	      // function cart.add is declared in services.js
	      cart.add(id, "img/Barcode.jpg", name, price, quantity,gym,"","","");
        }
    })
    };
  })

  .controller('CartCtrl', function ($scope, $stateParams, $ionicPopup, sharedCartService) {
    // Loads the '$scope variable' cart i.e. 'HTML variable'
    $scope.$on('$stateChangeSuccess', function () {
      $scope.cart = sharedCartService.cart;
      $scope.total_qty = sharedCartService.total_qty;
      $scope.total_amount = sharedCartService.total_amount;
    });

    $scope.expandItem = function(item) {
      if ($scope.isItemExpanded(item)) {
        $scope.shownItem = null;
      } else {
        $scope.shownItem = item;
      }
    };
    $scope.isItemExpanded = function(item) {
      return $scope.shownItem === item;
    };
    $scope.fromActivity = function() {
      return $stateParams.fromActivity === "true"
    }
  })

  .controller('LoginCtrl', function ($scope, $state) {
    $scope.doLogin = function () {
      $state.go("tab.gyms")
    };
  })

  .controller('AppCtrl', function ($scope, $state) {
    $scope.logout = function () {
      $state.go("login")
    };
  })

  .controller('SingleGymCtrl', function ($scope, $state, $ionicPopup, ionicDatePicker) {
    $scope.goBack = function () {
      $state.go("tab.gyms")
    };

    $scope.goToPersonalTrainerList = function () {
      $state.go("tab.personalTrainerList")
    }

    $scope.activities = [
      {
        name: "Pase Gimnasio",
        price: "$50"
      },
      {
        name: "Clase MMA",
        price: "$30"
      },
      {
        name: "Clase Zumba",
        price: "$20"
      }

    ];

    $scope.toggleActivity = function (activity) {
      if ($scope.isActivityShown(activity)) {
        $scope.shownActivity = null;
      } else {
        $scope.shownActivity = activity;
      }
    };
    $scope.isActivityShown = function (activity) {
      return $scope.shownActivity === activity;
    };

    $scope.addActivity = function (activity) {
      $ionicPopup.confirm({
        title: 'Confirmar selección',
        template: '<div><p><strong>' + activity.name + '</strong></p>Precio: ' + activity.price + '<br>Fecha: ' + $scope.selectedDate + '<br>Hora: 19:00hs</div>',
        okText: 'Continuar',
        cancelText: 'Cancelar'
      })
      .then(function(confirmed) {
        if (confirmed) {
          $scope.goToPersonalTrainerList();
        }
      })
    };

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var date = new Date(val);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        $scope.selectedDate = day+'/'+month+'/'+year;;
      },
      from: new Date(2017, 10, 23), //Optional
      to: new Date(2019, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      titleLabel: 'Select a Date',
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup',
      setLabel: 'Elegir',
      closeLabel: 'Cerrar'
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

  })

  //Personal Trainers
  .controller('PersonalCtrl', function ($scope, $ionicPopup, $state) {
    $scope.trainers = [{
      name: "Juan Perez",
      age: "29 años",
      profileImage: "img/personal1.png",
      speciality: "Musculación en general",
      price: 50
      },
      {
        name: "Federico Romo",
        age: "35 años",
        profileImage: "img/personal2.jpg",
        speciality: "Running",
        price: 50
      },
      {
        name: "Carla Mi",
        age: "31 años",
        profileImage: "img/personal3.jpeg",
        speciality: "Boxeo",
        price: 50
      },
      {
        name: "Lucas Gonzalez",
        age: "28 años",
        profileImage: "img/personal4.jpg",
        speciality: "Musculación en general",
        price: 50
      }];
    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.addPersonal = function (personal) {
      $ionicPopup.confirm({
        title: 'Confirmar selección',
        template: '<div><p>' + personal.name + '</p><strong>Precio: $' + personal.price + '</strong></div>',
        okText: 'Continuar',
        cancelText: 'Cancelar'
      })
      .then(function(confirmed) {
        if (confirmed) {
          // TODO - Add redirection to clothes selection screen
          $state.go("tab.clothes")
        }
      })
    };

    $scope.goToClothes = function(){
      $state.go("tab.clothes")
    }
  })

  .controller('RopaCtrl', function($scope, $state, $ionicPopup, sharedCartService, $ionicHistory) {
    $scope.groups = [];
    $scope.totalAlquilados = 0;
    $scope.cantidadAlquilados = 0;
    $scope.itemsAlquilados = [];
    //global variable shared between different pages.
    var cart = sharedCartService.cart;

    $scope.groups[0] = {
        name: "Remeras",
        items: []
      };
    $scope.groups[0].items[0] = {
        img:"img/shirt-rosa-mujer.jpg",
        marca: "Reebok",
        name: "Remera Dry Fit - Mujer",
        f: true,
        id: 1,
        precio: 10
      };
    $scope.groups[0].items[1] = {
        img:"img/shirt-azul-varon.jpeg",
        marca: "Nike",
        name: "Remera Dry Fit - Hombre",
        f: true,
        id: 2,
        precio: 10
      };

    $scope.groups[1] = {
        name: "Tops",
        items: []
      };
    $scope.groups[1].items[0] = {
        img:"img/admitone-Top-rojo.png",
        marca: "Admitone",
        name: "Top Rojo de tiras finas",
        f: false,
        id: 3,
        precio: 10
      };
    $scope.groups[1].items[1] = {
      img:"img/topNegro.png",
      marca: "Adidas",
      name: "Top Negro",
      f: false,
      id: 4,
      precio: 10
    };

    $scope.groups[2] = {
        name: "Shorts",
        items: []
      };
    $scope.groups[2].items[0] = {
        img:"img/women-short-black.jpg",
        marca: "Nike",
        name: "Short Femenino Negro",
        id: 5,
        precio: 10
      };
    $scope.groups[2].items[1] = {
      img:"img/short-blakc-men.jpg",
      marca: "Nike",
      name: "Short Masculino Negro",
      f: false,
      id: 6,
      precio: 10
    };
    $scope.groups[3] = {
        name: "Calsas",
        items: []
      };
    $scope.groups[3].items[0] = {
        img:"img/calsa-violeta.jpg",
        marca: "Reebok",
        name: "Calsa Femenina Violeta",
        f: true,
        id: 7,
        precio: 10
      };
    $scope.groups[3].items[1] = {
      img:"img/calsa-negra-varon.jpg",
      marca: "Reebok",
      name: "Calsa 3/4 Masculina ",
      f: true,
      id: 8,
      precio: 10
    };
    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

    $scope.showConfirm = function(ev,item) {

        // Appending dialog to document.body to cover sidenav in docs app
      var genero = item.f ? 'una ' : 'un ';
      var genero2 = item.f ? 'la ' : 'el ';

      var confirmPopup = $ionicPopup.confirm({
        title: '',
        template: '<div><div> <img ng-src="' + item.img + '" style="width:100%"/> </div> <div>' +
          ' Desea alquilar ' + genero  + '<b>' + item.name + '</b> para su actividad? </div></div>',
        okText: 'Alquilar',
        cancelText: 'Cancelar'
      });

      confirmPopup.then(function(res) {
        if(res) {
           $scope.cantidadAlquilados = $scope.cantidadAlquilados + 1;
           $scope.totalAlquilados = $scope.totalAlquilados + item.precio;
           $scope.itemsAlquilados.push(item);
        }
      });
    };

    $scope.continue = function(){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Comprar activdad',
        template: 'Desea finalizar la transaccion con la actividad?',
        okText: 'Comprar',
        cancelText: 'Cancelar'
      });
      confirmPopup.then(function(res){
        if(res){
          $ionicHistory.clearHistory();
          $state.go('tab.cart', {fromActivity: true});
          $scope.itemsAlquilados = [];
          $scope.cantidadAlquilados = 0;
          $scope.totalAlquilados = 0;
	  cart.add(20, "img/Barcode.jpg", "Pase Gimnasio", 120, 1,"Belgrano","Fecha y hora:23/11/2017 a las 19:00hs","Personal trainer:Juan Perez","Ropa:Remera Dry Fit - Hombre / Short Masculino Negro");
        }
      })
    }

    $scope.showRented = function(){
      var title = ''
      var template = ''
      if($scope.cantidadAlquilados > 0){

        template = '<ion-list><div id="listAlquilados">';
        for(var i = 0; i < $scope.itemsAlquilados.length; i ++){
          var item = $scope.itemsAlquilados[i];
          template += '<ion-item><img ng-src="' + item.img + '" style="width:100%;height:80%;"/><div class="row"><div class="col-md-6"></div>' +
            '<div class="col-md-4"><b>'+ item.name + '</b></div></div></ion-item>';
        }
        template += '</div></ion-list>';
      } else {
        template = 'No hay elementos alquilados'
      }
      var alertPopup = $ionicPopup.alert({
        title: 'Ya alquilados',
        template: template
       });
      alertPopup.then(function(){

      });
    }
  });
