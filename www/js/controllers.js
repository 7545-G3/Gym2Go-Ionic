angular.module('gym2go.controllers', [])
    .controller('GymsCtrl', function($scope, $state, $ionicPopup, $ionicLoading, gymData, $http) {
        $scope.gyms = []
        $scope.successCallback = function(json) {
            var gyms = [{
                    _id: 1,
                    name: "Gym1",
                    address: "Av. Paseo Colon 756",
                    lat: -34.618634,
                    lon: -58.369471,
                    validated: true,
                    activities: [
                        {  
                            _id: 1,
                            description: "Pase Gimnasio",
                            price: 50,
                            schedules: ["16:00", "18:30"]
                        },
                        {
                            _id: 2,
                            description: "Clase MMA",
                            price: 30,
                            schedules: ["16:00", "19:00"]
                        },
                        {
                            _id: 3,
                            description: "Clase Zumba",
                            price: 20,
                            schedules: ["18:30", "19:00"]
                        }
                    ],
                    products: [
                    {
                        _id: 1,
                        name: "Pepa",
                        description: "1Kg",
                        price: 100,
                        category: "Proteinas",
                        brand: "Supp",
                        imageUrl: "img/Proteina1.jpg", //should be base64
                        type: "SUPPS",
                        gender: null
                    },
                    {
                        _id: 2,
                        type: "CLO",
                        category: "Remeras",
                        imageUrl: "img/shirt-rosa-mujer.jpg",
                        brand: "Reebok",
                        name: "Remera Dry Fit - Mujer",
                        gender: "F",
                        price: 10
                    },
                    {
                        _id: 3,
                        type: "CLO",
                        category: "Remeras",
                        imageUrl: "img/shirt-azul-varon.jpeg",
                        brand: "Nike",
                        name: "Remera Dry Fit - Hombre",
                        gender: "M",
                        price: 10
                    },
                    {
                        _id: 4,
                        type: "CLO",
                        category: "Tops",
                        imageUrl: "img/admitone-Top-rojo.png",
                        brand: "Admitone",
                        name: "Top Rojo de tiras finas",
                        gender: "F",
                        price: 10
                    },
                    {
                        _id: 5,
                        type: "CLO",
                        category: "Tops",
                        imageUrl: "img/topNegro.png",
                        brand: "Adidas",
                        name: "Top Negro",
                        gender: "F",
                        price: 10
                    },
                    {
                        _id: 6,
                        type: "CLO",
                        category: "Shorts",
                        imageUrl: "img/women-short-black.jpg",
                        brand: "Nike",
                        name: "Short Femenino Negro",
                        gender: "F",
                        price: 10
                    },
                    {
                        _id: 7,
                        type: "CLO",
                        category: "Shorts",
                        imageUrl: "img/short-blakc-men.jpg",
                        brand: "Nike",
                        name: "Short Masculino Negro",
                        gender: "M",
                        price: 10
                    },
                    {
                        _id: 8,
                        type: "CLO",
                        category: "Calsas",
                        imageUrl: "img/calsa-violeta.jpg",
                        brand: "Reebok",
                        name: "Calsa Femenina Violeta",
                        gender: "F",
                        price: 10
                    },
                    {
                        _id: 9,
                        type: "CLO",
                        category: "Calsas",
                        imageUrl: "img/calsa-negra-varon.jpg",
                        brand: "Reebok",
                        name: "Calsa 3/4 Masculina ",
                        gender: "M",
                        price: 10
                    }],
                    trainers: [{
                            _id: 1,
                            email: "Juan Perez",
                            age: "29 años",
                            image: "img/personal1.png",
                            speciality: "Musculación en general",
                            price: 50
                        },
                        {
                            _id: 2,
                            email: "Federico Romo",
                            age: "35 años",
                            image: "img/personal2.jpg",
                            speciality: "Running",
                            price: 50
                        }
                    ]
                },
                {
                    _id: 2,
                    name: "Gym2",
                    lat: -34.616321,
                    lon: -58.368526,
                    activities: [{
                        _id: 4,
                        description: "Pase Gimnasio",
                        price: 50,
                        schedules: ["16:00", "18:30", "19:00"]
                    }],
                    products: [
                        {
                            _id: 9,
                            name: "Pepa",
                            description: "1.5Kg",
                            price: 100,
                            category: "Aminoacidos",
                            brand: "Supp",
                            imageUrl: "img/Proteina1.jpg", //should be base64
                            type: "SUPPS",
                            gender: null
                        },
                        {
                            _id: 3,
                            type: "CLO",
                            category: "Remeras",
                            imageUrl: "img/shirt-azul-varon.jpeg",
                            brand: "Nike",
                            name: "Remera Dry Fit - Hombre",
                            gender: "M",
                            price: 10
                        },
                        {
                            _id: 4,
                            type: "CLO",
                            category: "Tops",
                            imageUrl: "img/admitone-Top-rojo.png",
                            brand: "Admitone",
                            name: "Top Rojo de tiras finas",
                            gender: "F",
                            price: 10
                        },
                        {
                            _id: 5,
                            type: "CLO",
                            category: "Tops",
                            imageUrl: "img/topNegro.png",
                            brand: "Adidas",
                            name: "Top Negro",
                            gender: "F",
                            price: 10
                        },
                        {
                            _id: 6,
                            type: "CLO",
                            category: "Shorts",
                            imageUrl: "img/women-short-black.jpg",
                            brand: "Nike",
                            name: "Short Femenino Negro",
                            gender: "F",
                            price: 10
                        },
                        {
                            _id: 7,
                            type: "CLO",
                            category: "Shorts",
                            imageUrl: "img/short-blakc-men.jpg",
                            brand: "Nike",
                            name: "Short Masculino Negro",
                            gender: "M",
                            price: 10
                        }
                        ],
                    trainers: [
                        {
                            _id: 3,
                            email: "Carla Mi",
                            age: "31 años",
                            image: "img/personal3.jpeg",
                            speciality: "Boxeo",
                            price: 50
                        },
                        {
                            _id: 4,
                            email: "Lucas Gonzalez",
                            age: "28 años",
                            image: "img/personal4.jpg",
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
        if (gymData.getGymsList().length == 0) 
        {
            var str = "api/gyms";
            $http.get(str).success($scope.successCallback).error($scope.errorCallback);
        } else {
            $scope.gyms = gymData.getGymsList();
        }

    })

    //Proteinas
    .controller('SuppsCtrl', function($scope, Chats, $ionicPopup, 
    sharedCartService, gymData,  $ionicLoading, base64, $http) {
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

        if (gymData.getGymsList().length == 0)
        {
            $http.get(str).success($scope.successCallback).error($scope.errorCallback);
        }

        function getListOfGymNames() {
            $scope.gyms = [];
            var gyms = gymData.getGymsList();
            for (var i = 0; i < gyms.length; i++) {
                $scope.gyms.push(gyms[i].name);
            }

        }

        function getGroupIndex(groupName) 
        {
            for (var i = 0; i < $scope.groups.length; i++) 
            {
                if ($scope.groups[i].name == groupName) {
                    return i;
                }
            }
            return -1;
        }

        function prepareGroups(gym)
        {
            var products = gym.products;
            for (var i = 0; i < products.length; i++) 
            {
                if( products[i].type == "SUPPS" )
                {
                    var groupIndex = getGroupIndex(products[i].category);
                    var item = {
                        img:products[i].imageUrl,
                        marca:products[i].brand,
                        peso:products[i].description,
                        _id: products[i]._id,
                        precio: products[i].price,
                        cantidad: 0
                    }

                    if (groupIndex != -1) {
                        $scope.groups[groupIndex].items.push(item)
                    } else {
                        $scope.groups.push({
                            name:products[i].category,
                            items: [item]
                        })
                    }
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
                template: '<div><p>' + name + '</p><strong>Precio: $' + price*quantity + '</strong></div>',
                okText: 'Continuar',
                cancelText: 'Cancelar'
            }).then(function(confirmed)
            {
                if (confirmed) 
                {
                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    base64.toDataURL("img/Barcode.jpg",function(url)
                    {
                        var str = "api/users/" + localStorage.getItem("idusuario") + "/supplements";
                        $http.post(str, {
                                supplement: id,
                                gym: gymData.getGymsList()[$scope.data.index]._id,
                                cant: quantity,
                                qrImage: url
                        }).success(function(response)
                        {
                            $ionicLoading.hide()
                            cart.add(response._id, url, name, price, quantity, gym);
                            var alertPopup = $ionicPopup.alert({
                                title: 'Exito',
                                template: 'Compra exitosa'
                            });
                        }).error( function(response)
                        {
                            $ionicLoading.hide()
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'No se pudo realizar la compra'
                            });
                        });
                    })
                  
                }
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
            var transformedActivities = [];
            for (var i = 0; i < activities.length; i++)
            {
                transformedActivities.push({
                    name: activities[i].description,
                    price: activities[i].price,
                    hours: activities[i].schedules,
                    hoursId: 0,
                    _id: activities[i]._id
                })
            }
            return transformedActivities
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
                    template: '<div><p><strong>' + activity.name + '</strong></p>Precio: '
                     + activity.price + '<br>Fecha: ' + $scope.selectedDate +
                        '<br>Hora: ' + activity.hours[activity.hoursId] + 'hs</div>',
                    okText: 'Continuar',
                    cancelText: 'Cancelar'
                })
                .then(function(confirmed) {
                    if (confirmed) {
                        //TODO add to cart the activty and hour
                        sharedCartService.startNewGymPass(getGymName(),activity._id, activity.name, activity.price, $scope.selectedDate, activity.hours[activity.hoursId])
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
        var trainers =  gymData.getActualGym().trainers;
        var transformedTrainers = [];
        for( var i = 0; i < trainers.length; i++ )
        {
            transformedTrainers.push({
                name: trainers[i].email,
                price: trainers[i].price,
                age: trainers[i].age,
                speciality: trainers[i].speciality,
                profileImage: trainers[i].image,
                _id: trainers[i]._id
            });
        }
        $scope.trainers = transformedTrainers;
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
                        sharedCartService.setGymPassTrainer(personal._id, personal.name, personal.price)
                        $state.go("tab.clothes")
                    }
                })
        };

        $scope.goToClothes = function() {
            $state.go("tab.clothes")
        }
    })

    .controller('RopaCtrl', function($scope, $state, $ionicPopup, sharedCartService, $ionicHistory, $http, $ionicLoading, gymData, base64) {
        $scope.groups = [];
        $scope.totalAlquilados = 0;
        $scope.cantidadAlquilados = 0;
        $scope.itemsAlquilados = [];
        //global variable shared between different pages.
        var cart = sharedCartService.cart;
        makeGymGroups()
        function makeGymGroups() 
        {
            var products =  gymData.getActualGym().products;
            for( var i = 0; i < products.length; i++ )
            {
                if( products[i].type == "CLO" )
                {
                    registerProduct(products[i]);
                }
            }
        }

        function registerProduct( product )
        {
            var groupIndex = getGroupIndex(product.category);
            var item = {
                img: product.imageUrl,
                marca: product.brand,
                name: product.name,
                f: product.gender == "F",
                _id: product._id,
                precio: product.price
            };
            if( groupIndex == -1 )
            {
                $scope.groups.push(
                {
                    name: product.category, 
                    items: [item]
                });
            }  else 
            {
                $scope.groups[groupIndex].items.push(item)
            }
        }

        function getGroupIndex(groupName)
        {
            for( var i = 0; i < $scope.groups.length; i++ )
            {
                if( $scope.groups[i].name == groupName )
                {
                    return i;
                }
            }
            return -1;
        }
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
            var item = item;
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: '<div><div> <img ng-src="' + item.img + '" style="width:100%"/> </div> <div>' +
                    ' Desea alquilar ' + genero + '<b>' + item.name + '</b> para su actividad? </div></div>',
                okText: 'Alquilar',
                cancelText: 'Cancelar'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    sharedCartService.addGymPassClothes(item._id, item.name, item.precio)
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

        function getGymId(){
            return gymData.getActualGym()._id
        }

        function getGymName() 
        {
            return sharedCartService.gymPass.gym
        }

        function getActivityId()
        {
            return sharedCartService.gymPass.activity._id;
        }
                               
        function getActivityName() {
            return sharedCartService.gymPass.activity.name;
        }

        function getActivtyDescription() {
            var activity = sharedCartService.gymPass.activity;
            return "Fecha y hora: " + activity.day + " a las " + activity.time + "hs"
        }

        function getPersonalTrainerId()
        {
            var trainer = sharedCartService.gymPass.trainer;
            if (trainer != null) {
                return trainer._id
            }
            return null
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

         function getClothesIds()
         {
            var list = []
            for (var i = 0; i < sharedCartService.gymPass.clothes.length; i++) {
                list.push(sharedCartService.gymPass.clothes[i]._id)
            }
            return list;
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

                    base64.toDataURL("img/Barcode.jpg",function(url)
                    {
                        var str = "api/users/" + localStorage.getItem("idusuario") + "/gym-passes";
                        $http.post(str, {
                                clothes: getClothesIds(),
                                activity: getActivityId(),
                                date: getActivtyDescription(),
                                trainer: getPersonalTrainerId(),
                                gym: getGymId(),
                                qrImage: url
                        }).success(function(response)
                        {
                            $ionicLoading.hide()
                             cart.add(response._id, url, getActivityName(), calculatePassPrice(), 1, getGymName(), getActivtyDescription(),
                                    "Personal trainer: " + getPersonalTrainer(), "Ropa: " + getClothesList());
                            var alertPopup = $ionicPopup.alert({
                                title: 'Exito',
                                template: 'Compra exitosa'
                            }).then(function(){
                                $ionicHistory.clearHistory();
                                $state.go('tab.cart', {
                                    fromActivity: true
                                });
                                $scope.itemsAlquilados = [];
                                $scope.cantidadAlquilados = 0;
                                $scope.totalAlquilados = 0;
                                //Add to cart the activity

                               
                            });

                        }).error( function(response)
                        {
                            $ionicLoading.hide()
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'No se pudo realizar la compra'
                            });
                        });
                    })


                   
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
