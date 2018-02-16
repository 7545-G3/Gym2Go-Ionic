angular.module('gym2go.controllers', [])
    .controller('GymsCtrl', function($scope, $state, $ionicPopup, serverJsonRequest, gymData) {
        $scope.gyms = []
        $scope.successCallback = function(json) {
            var gyms = [{
                    name: "Gym1",
                    lat: -34.618634,
                    lon: -58.369471,
                    activities: [{
                            name: "Pase Gimnasio",
                            price: 50,
                            hours: ["16:00", "18:30"]
                        },
                        {
                            name: "Clase MMA",
                            price: 30,
                            hours: ["16:00", "19:00"]
                        },
                        {
                            name: "Clase Zumba",
                            price: 20,
                            hours: ["18:30", "19:00"]
                        }
                    ],
                    products: [{
                        name: "Pepa",
                        description: "pega duro",
                        price: 100,
                        imageUrl: "img/Proteina1.jpg", //should be base64
                        type: "Proteinas"
                    }],
                    trainers: [{
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
                        }
                    ]
                },
                {
                    name: "Gym2",
                    lat: -34.616321,
                    lon: -58.368526,
                    activities: [{
                        name: "Pase Gimnasio",
                        price: 50,
                        hours: ["16:00", "18:30", "19:00"]
                    }],
                    products: [{
                        name: "Pepa",
                        description: "pega duro",
                        price: 100,
                        imageUrl: "img/Proteina1.jpg", //should be base64
                        type: "Aminoacidos"
                    }],
                    trainers: [{
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
                        }
                    ]
                }
            ]
            gymData.saveGyms(gyms)
            $scope.gyms = gyms
        }
        $scope.errorCallback = function() {
            $ionicPopup.alert({
                title: 'Error obteniendo gimnasios'
            }).then(function() {

            });
        }
        $scope.onSelectedGym = function(gymName) {
            for (var index = 0; index < gymData.getGymsList().length; index++) {
                if (gymData.getGymsList()[index].name == gymName) {
                    gymData.addActualWorkingGym(gymData.getGymsList()[index]);
                    $state.go("tab.activities");
                    break;
                }
            }

        }
        if (gymData.getGymsList().length == 0) {
            serverJsonRequest.get(serverJsonRequest.baseUrl + serverJsonRequest.gymRequests, $scope.successCallback, $scope.errorCallback)
        } else {
            $scope.gyms = gymData.getGymsList();
        }

    })

    //Proteinas
    .controller('SuppsCtrl', function($scope, Chats, $ionicPopup, sharedCartService, gymData, serverJsonRequest) {
        $scope.groups = [];
        $scope.compras = {};
        $scope.gyms = [];
        $scope.data = {};
        $scope.data.index = 0;
        //global variable shared between different pages.
        var cart = sharedCartService.cart;
        $scope.successCallback = function(json) {
            gymData.saveGyms(json);
            $scope.gyms = getListOfGymNames();
            $scope.groups = getListOfGroups(0);
        }
        $scope.errorCallback = function() {
            $ionicPopup.alert({
                title: 'Error obteniendo gimnasios'
            }).then(function() {

            });
        }

        getListOfGymNames();
        getListOfGroups(0);

        if (gymData.getGymsList().length == 0) {
            serverJsonRequest.get(serverJsonRequest.baseUrl + serverJsonRequest.gymRequests, $scope.successCallback, $scope.errorCallback)
        }

        function getListOfGymNames() {
            $scope.gyms = [];
            var gyms = gymData.getGymsList();
            for (var i = 0; i < gyms.length; i++) {
                $scope.gyms.push(gyms[i].name);
            }

        }

        function getGroupIndex(groupName) {
            for (var i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups[i].name == groupName) {
                    return i;
                }
            }
            return -1;
        }

        function prepareGroups(gym) {
            for (var i = 0; i < gym.products.length; i++) {
                var groupIndex = getGroupIndex(gym.products[i].type);
                var item = {
                    img: gym.products[i].imageUrl,
                    marca: gym.products[i].name,
                    peso: gym.products[i].description,
                    id: 1,
                    precio: gym.products[i].price,
                    cantidad: 0
                }

                if (groupIndex != -1) {
                    $scope.groups[groupIndex].items.push(item)
                } else {
                    $scope.groups.push({
                        name: gym.products[i].type,
                        items: [item]
                    })
                }
            }
        }

        function getListOfGroups(indexGym) {
            $scope.groups = [];
            var gyms = gymData.getGymsList();

            if (gyms.length >= indexGym + 1 && indexGym >= 0) {
                prepareGroups(gyms[indexGym])
            }
        }

        $scope.unitChanged = function() {
            getListOfGroups($scope.data.index)
        }
        /*$scope.groups[0] = {
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
    };*/
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

        //add to cart function
        $scope.addToCart = function(id, image, name, price, quantity, gym) {
            $ionicPopup.confirm({
                title: 'Confirmar Compra',
                template: '<div><p>' + name + '</p><strong>Precio: $' + price + '</strong></div>',
                okText: 'Continuar',
                cancelText: 'Cancelar'
            })
        }
    })

    .controller('CartCtrl', function($scope, $stateParams, $ionicPopup, sharedCartService) {
        // Loads the '$scope variable' cart i.e. 'HTML variable'
        $scope.$on('$stateChangeSuccess', function() {
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

    .controller('LoginCtrl', function($scope, $ionicLoading, $state, $http, $ionicPopup, $ionicHistory) {
        $scope.loginData = {};
        $scope.doLogin = function() {

            $ionicLoading.show({
                template: 'Loading...'
            });
            var str = "api/users/login";
            $http.post(str, {
                    email: $scope.loginData.username,
                    password: $scope.loginData.password
                })
                .success(function(response) { // if login request is Accepted
                    if (response == null) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error de Login',
                            template: 'Credenciales inválidas'
                        });
                    } else {
                        $scope.user_details = response;
                        //stores the data in the session. if the user is logged in, then there is no need to show login again.
                        localStorage.setItem('email', response.email);
                        localStorage.setItem('idusuario', response._id);
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $ionicLoading.hide();
                        $state.go("tab.gyms")
                    }
                }).error(function(response) { //if login failed

                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error de Login',
                        template: response.message
                    });
                });
        };
    })
    .controller('signupCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $state, $ionicHistory) {
        $scope.Tarjetas = ["Visa", "Amex", "Mastercard"];
        $scope.signup = function(data) {

            $ionicLoading.show({
                template: 'Creando cuenta...'
            });
            var link = 'api/users';
            //using http post as we are passing password.
            $http.post(link, {
                    email: data.username,
                    password: data.password,
                    creditCardBrand: data.item,
                    creditCardNumber: data.numerotc,
                    creditCardCode: data.code
                })
                .success(function(response) {
                    setTimeout(25000)
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Cuenta Creada',
                        template: "Tu cuenta ha sido creada correctamente."
                    });
                    $state.go('login');
                })
                .error(function(response) { //if login failed
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error de registración',
                        template: response.message
                    });
                });
        }
    })
    .controller('AppCtrl', function($scope, $state) {
        $scope.logout = function() {
            localStorage.removeItem('email');
            localStorage.removeItem('idusuario');
            $state.go("login")
        };
    })

    .controller('SingleGymCtrl', function($scope, $state, $ionicPopup, ionicDatePicker, gymData, sharedCartService) {
        $scope.goBack = function() {
            $state.go("tab.gyms")
        };

        $scope.goToPersonalTrainerList = function() {
            $state.go("tab.personalTrainerList")
        }

        $scope.activities = getGymActivities()
        $scope.gymName = getGymName()

        function getGymActivities() {
            var activities = gymData.getActualGym().activities;
            for (var i = 0; i < activities.length; i++) {
                activities[i].hoursId = 0;
            }
            return activities
        }

        function getGymName() {
            return gymData.getActualGym().name;
        }

        $scope.toggleActivity = function(activity) {
            if ($scope.isActivityShown(activity)) {
                $scope.shownActivity = null;
            } else {
                $scope.shownActivity = activity;
            }
        };
        $scope.isActivityShown = function(activity) {
            return $scope.shownActivity === activity;
        };

        $scope.addActivity = function(activity) {
            $ionicPopup.confirm({
                    title: 'Confirmar selección',
                    template: '<div><p><strong>' + activity.name + '</strong></p>Precio: ' + activity.price + '<br>Fecha: ' + $scope.selectedDate +
                        '<br>Hora: ' + activity.hours[activity.hoursId] + 'hs</div>',
                    okText: 'Continuar',
                    cancelText: 'Cancelar'
                })
                .then(function(confirmed) {
                    if (confirmed) {
                        //TODO add to cart the activty and hour
                        sharedCartService.startNewGymPass(getGymName(), activity.name, activity.price, $scope.selectedDate, activity.hours[activity.hoursId])
                        $scope.goToPersonalTrainerList();
                    }
                })
        };

        var ipObj1 = {
            callback: function(val) { //Mandatory

                var date = new Date(val);

                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();

                $scope.selectedDate = day + '/' + month + '/' + year;;
            },
            from: new Date(2017, 10, 23), //Optional
            to: new Date(2019, 10, 30), //Optional
            inputDate: new Date(), //Optional
            titleLabel: 'Select a Date',
            mondayFirst: true, //Optional
            disableWeekdays: [0], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup',
            setLabel: 'Elegir',
            closeLabel: 'Cerrar'
        };

        $scope.openDatePicker = function() {
            ionicDatePicker.openDatePicker(ipObj1);
        };

    })

    //Personal Trainers
    .controller('PersonalCtrl', function($scope, $ionicPopup, $state, gymData, sharedCartService) {
        $scope.trainers = gymData.getActualGym().trainers
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.addPersonal = function(personal) {
            $ionicPopup.confirm({
                    title: 'Confirmar selección',
                    template: '<div><p>' + personal.name + '</p><strong>Precio: $' + personal.price + '</strong></div>',
                    okText: 'Continuar',
                    cancelText: 'Cancelar'
                })
                .then(function(confirmed) {
                    if (confirmed) {
                        // TODO - Add trainer to cart if chosen
                        sharedCartService.setGymPassTrainer(personal.name, personal.price)
                        $state.go("tab.clothes")
                    }
                })
        };

        $scope.goToClothes = function() {
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

        function makeGymGroups() {

        }

        $scope.groups[0] = {
            name: "Remeras",
            items: []
        };
        $scope.groups[0].items[0] = {
            img: "img/shirt-rosa-mujer.jpg",
            marca: "Reebok",
            name: "Remera Dry Fit - Mujer",
            f: true,
            id: 1,
            precio: 10
        };
        $scope.groups[0].items[1] = {
            img: "img/shirt-azul-varon.jpeg",
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
            img: "img/admitone-Top-rojo.png",
            marca: "Admitone",
            name: "Top Rojo de tiras finas",
            f: false,
            id: 3,
            precio: 10
        };
        $scope.groups[1].items[1] = {
            img: "img/topNegro.png",
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
            img: "img/women-short-black.jpg",
            marca: "Nike",
            name: "Short Femenino Negro",
            id: 5,
            precio: 10
        };
        $scope.groups[2].items[1] = {
            img: "img/short-blakc-men.jpg",
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
            img: "img/calsa-violeta.jpg",
            marca: "Reebok",
            name: "Calsa Femenina Violeta",
            f: true,
            id: 7,
            precio: 10
        };
        $scope.groups[3].items[1] = {
            img: "img/calsa-negra-varon.jpg",
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

        $scope.showConfirm = function(ev, item) {

            // Appending dialog to document.body to cover sidenav in docs app
            var genero = item.f ? 'una ' : 'un ';
            var genero2 = item.f ? 'la ' : 'el ';

            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: '<div><div> <img ng-src="' + item.img + '" style="width:100%"/> </div> <div>' +
                    ' Desea alquilar ' + genero + '<b>' + item.name + '</b> para su actividad? </div></div>',
                okText: 'Alquilar',
                cancelText: 'Cancelar'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    sharedCartService.addGymPassClothes(item.name, item.precio)
                    $scope.cantidadAlquilados = $scope.cantidadAlquilados + 1;
                    $scope.totalAlquilados = $scope.totalAlquilados + item.precio;
                    $scope.itemsAlquilados.push(item);
                }
            });
        };

        function calculatePassPrice() {
            var total = 0;
            total = +sharedCartService.gymPass.activity.price
            if (sharedCartService.gymPass.trainer != null) {
                total += sharedCartService.gymPass.trainer.price
            }
            for (var i = 0; i < sharedCartService.gymPass.clothes.length; i++) {
                total += sharedCartService.gymPass.clothes[i].price;
            }
            return total;
        }

        function getGymName() {
            return sharedCartService.gymPass.gym
        }

        function getActivityName() {
            return sharedCartService.gymPass.activity.name;
        }

        function getActivtyDescription() {
            var activity = sharedCartService.gymPass.activity;
            return "Fecha y hora: " + activity.day + " a las " + activity.time + "hs"
        }

        function getPersonalTrainer() {
            var trainer = sharedCartService.gymPass.trainer;
            if (trainer != null) {
                return trainer.name
            }
            return "-"
        }

        function getClothesList() {
            if (sharedCartService.gymPass.clothes.length == 0) {
                return "-"
            }
            var list = ""
            for (var i = 0; i < sharedCartService.gymPass.clothes.length; i++) {
                list += sharedCartService.gymPass.clothes[i].name + " / ";
            }
            return list.slice(0, list.length - 3);
        }

        $scope.continue = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Comprar activdad',
                template: 'Desea finalizar la transaccion con la actividad?',
                okText: 'Comprar',
                cancelText: 'Cancelar'
            });
            confirmPopup.then(function(res) {
                if (res) {

                    $ionicHistory.clearHistory();
                    $state.go('tab.cart', {
                        fromActivity: true
                    });
                    $scope.itemsAlquilados = [];
                    $scope.cantidadAlquilados = 0;
                    $scope.totalAlquilados = 0;
                    //Add to cart the activity

                    cart.add(20, "img/Barcode.jpg", getActivityName(), calculatePassPrice(), 1, getGymName(), getActivtyDescription(),
                        "Personal trainer: " + getPersonalTrainer(), "Ropa: " + getClothesList());
                }
            })
        }

        $scope.showRented = function() {
            var title = ''
            var template = ''
            if ($scope.cantidadAlquilados > 0) {

                template = '<ion-list><div id="listAlquilados">';
                for (var i = 0; i < $scope.itemsAlquilados.length; i++) {
                    var item = $scope.itemsAlquilados[i];
                    template += '<ion-item><img ng-src="' + item.img + '" style="width:100%;height:80%;"/><div class="row"><div class="col-md-6"></div>' +
                        '<div class="col-md-4"><b>' + item.name + '</b></div></div></ion-item>';
                }
                template += '</div></ion-list>';
            } else {
                template = 'No hay elementos alquilados'
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Ya alquilados',
                template: template
            });
            alertPopup.then(function() {

            });
        }
    });
