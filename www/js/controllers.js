angular.module('gym2go.controllers', [])
    .controller('GymsCtrl', function($scope, $state, $ionicPopup, $ionicLoading, gymData, $http, NgMap) {
        $scope.gyms = []
        $scope.activitiesFilter = []
        $scope.data = {}
        $scope.data.index = 0
        $scope.infoGym = {}
        var vm = this;
        $scope.createSelectList = function()
        {
            var gyms = gymData.getGymsList();
            $scope.activitiesFilter = ["Todas las actividades"]
            for( var i = 0; i < gyms.length; i ++ )
            {
                for( var j = 0; j < gyms[i].activities.length; j++)
                {
                    if( !gyms[i].validated ) continue;
                    var name = gyms[i].activities[j].description
                    var alreadyInList = false;
                    for( var k = 0; k < $scope.activitiesFilter.length; k++)
                    {
                        if( name == $scope.activitiesFilter[k] )
                        {
                            alreadyInList = true
                        }
                    }
                    if( !alreadyInList )
                    {
                        $scope.activitiesFilter.push(name)
                    }
                }
            }
        }

        $scope.successCallback = function(json) {
            $ionicLoading.hide()
            $scope.data.index = 0
            gymData.saveGyms(json)
            $scope.createSelectList()
            for( var i = 0; i < json.length; i++ )
            {
                if( json[i].validated )
                {
                    $scope.gyms.push(json[i]);
                }
            }
        }
        
        $scope.errorCallback = function() {
            $ionicLoading.hide()
            $ionicPopup.alert({
                title: 'Error obteniendo gimnasios'
            }).then(function() {

            });
        }
        
        function onSelectedGym(gymName) 
        {
            console.log("Click id " + gymName)
            for (var index = 0; index < gymData.getGymsList().length; index++) {
                if (gymData.getGymsList()[index]._id == gymName) {
                    gymData.addActualWorkingGym(gymData.getGymsList()[index]);
                    $state.go("tab.activities");
                    break;
                }
            }
        }
        vm.onSelectedGym = onSelectedGym
        $scope.onSelectedGym = onSelectedGym

        $scope.onFilterGyms = function()
        {
            var allGyms = gymData.getGymsList()
            if( $scope.data.index == 0 )
            {
                $scope.allGyms = [];
                for( var j = 0; j < allGyms.length; j++)
                {
                    if( allGyms[j].validated )
                        $scope.gyms.push(allGyms[j])
                }
                return
            }
            var activityName = $scope.activitiesFilter[$scope.data.index];
            var filtered = [];
            for( var i = 0; i < allGyms.length; i ++ )
            {
                if( !allGyms[i].validated ) continue;
                for( var j = 0; j < allGyms[i].activities.length; j++)
                {
                    if(allGyms[i].activities[j].description == activityName)
                    {
                        filtered.push(allGyms[i]);
                        break;
                    }
                }
            }
            console.log("previoues");
            console.log($scope.gyms )
            $scope.gyms = filtered
            console.log("actual");
            console.log($scope.gyms )
        }

        NgMap.getMap().then(function(map) 
        {
          $scope.map = map;
        });

        $scope.showInfo = function(evetn, gym)
        {
            $scope.infoGym = gym;
            console.log(gym)
            $scope.map.showInfoWindow('infoWindow', this)
        }

        $scope.$on('$ionicView.beforeEnter', function() 
        {
            $scope.gyms = []
            $scope.activitiesFilter = []
            $scope.data = {}
            $scope.data.index = 0
           
            $ionicLoading.show({
                template: 'Cargando...'
            })
            var str = "api/gyms";
            $http.get(str).success($scope.successCallback).error($scope.errorCallback);
    
         })
      

    })

    //Proteinas
    .controller('SuppsCtrl', function($scope, Chats, $ionicPopup, 
    sharedCartService, gymData,  $ionicLoading, base64, $http, userData) {
        $scope.groups = [];
        $scope.compras = {};
        $scope.gyms = [];
        $scope.data = {};
        $scope.data.index = 0;
        //global variable shared between different pages.
        var cart = sharedCartService.cart;

        $scope.successCallback = function(json) 
        {
            gymData.saveGyms(json);
            $scope.gyms = getListOfGymNames();
            $scope.groups = getListOfGroups($scope.gyms[0].index);
        }
        $scope.errorCallback = function() {
            $ionicPopup.alert({
                title: 'Error obteniendo gimnasios'
            }).then(function() {

            });
        }

        function getListOfGymNames() {
            $scope.gyms = [];
            var gyms = gymData.getGymsList();
            for (var i = 0; i < gyms.length; i++) 
            {
                if( gyms[i].validated )
                {
                    $scope.gyms.push({
                        name: gyms[i].name,
                        index: i,
                        id: gyms[i]._id
                    });
                }
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
                        img:products[i].image,
                        marca:products[i].brand,
                        peso:products[i].description,
                        _id: products[i]._id,
                        precio: products[i].price,
                        nombre: products[i].name,
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

        function getListOfGroups(indexGym)
        {
            $scope.groups = [];
            var gyms = gymData.getGymsList();
            console.log("Index is " + indexGym);
            if  (gyms.length >= indexGym + 1 && indexGym >= 0)
            {
                prepareGroups(gyms[indexGym])
            }
        }

        $scope.unitChanged = function() 
        {
            getListOfGroups($scope.gyms[$scope.data.index].index)
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
                        template: 'Cargando...'
                    });

                    base64.toDataURL("img/Barcode.jpg",function(url)
                    {
                        var str = "api/users/" +  userData.get()._id + "/supplements";
                        $http.post(str, {
                                supplement: id,
                                gym: gym.id,
                                cant: quantity,
                                qrImage: url
                        }).success(function(response)
                        {
                            $ionicLoading.hide()
                            cart.add(response._id, url, name, price, quantity, gym.name);
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

        $scope.$on('$ionicView.beforeEnter', function() {
            getListOfGymNames();

            if ( gymData.getGymsList().length == 0 )
            {
                var str = "api/gyms"
                $http.get(str).success($scope.successCallback).error($scope.errorCallback);
            } else 
            {
                getListOfGroups($scope.gyms[0].index);
            }
        });
    })

    .controller('CartCtrl', function($scope, $stateParams, $ionicPopup, sharedCartService, userData, gymData) {
        // Loads the '$scope variable' cart i.e. 'HTML variable'

        $scope.cart = sharedCartService.cart;
        $scope.total_qty = sharedCartService.total_qty;
        $scope.total_amount = sharedCartService.total_amount;

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

        $scope.$on('$ionicView.beforeEnter', function() 
        {
            var bought = userData.createUserBoughtItems(gymData.getGymsList())
            if( bought != null )
            { 
                for( var i = 0; i < bought.passes.length; i++ )
                {
                    var pass = bought.passes[i]
                    sharedCartService.cart.add(pass.id, 
                        pass.qr, pass.activityName,
                        pass.price, 1, 
                        pass.gymName, 
                        pass.description,
                        pass.trainer,
                        pass.clothes
                    )
                }
                for( var i = 0; i < bought.supplements.length; i++ )
                {
                    var supp = bought.supplements[i];
                    sharedCartService.cart.add(
                        supp.id, supp.qr, supp.name, supp.price, supp.quantity, supp.gymName);
                }           
            }
        });
    })

    .controller('LoginCtrl', function($scope, $ionicLoading, $state, $http, $ionicPopup, $ionicHistory, userData) {
        $scope.loginData = {};
        $scope.doLogin = function() {
            $ionicLoading.show({
                template: 'Cargando...'
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
                        userData.set(response)
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
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
    .controller('AppCtrl', function($scope, $state, userData, sharedCartService, gymData) {
        $scope.logout = function() 
        {
            gymData.saveGyms([]);
            sharedCartService.cart.resetBoughts()
            userData.set(null);

            $state.go("login");
        };
    })

    .controller('SingleGymCtrl', function($scope, $state, $ionicPopup, ionicDatePicker, gymData, sharedCartService) {
        $scope.goBack = function() {
            $state.go("tab.gyms")
        };

        $scope.goToPersonalTrainerList = function() {
            $state.go("tab.personalTrainerList")
        }

        function getGymActivities() {
            var activities = gymData.getActualGym().activities;
            var transformedActivities = [];
            for (var i = 0; i < activities.length; i++)
            {
                transformedActivities.push({
                    name: activities[i].description,
                    price: activities[i].price,
                    hours: activities[i].schedules,
                    mapHours: {},
                    availabeHours: [],
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
                    template: '<div><p><strong>' + activity.name + '</strong></p>Precio: $'
                     + activity.price + '<br>Fecha: ' + $scope.selectedDate +
                        '<br>Hora: ' + activity.availabeHours[activity.hoursId] + 'hs</div>',
                    okText: 'Continuar',
                    cancelText: 'Cancelar'
                })
                .then(function(confirmed) {
                    if (confirmed) {
                        //TODO add to cart the activty and hour
                        sharedCartService.startNewGymPass(getGymName(),activity._id, activity.name, activity.price, $scope.selectedDate, activity.availabeHours[activity.hoursId])
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
            disableWeekdays: [0,6], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup',
            setLabel: 'Elegir',
            closeLabel: 'Cerrar'
        };

        function getWeekDaysDisabled(activity)
        {
            var days =
            {
                "Domingo" : 0,
                "Lunes" : 1,
                "Martes" : 2,
                "Miercoles" : 3,
                "Jueves" : 4,
                "Viernes" :5,
                "Sabado": 6

            }
            var schedules = activity.hours;
            var mapHours = {}
            var disabled = [0,1,2,3,4,5,6];
            for(var i = 0; i < activity.hours.length; i++)
            {
                var split = activity.hours[i].split(" ");
                if( split.length != 2 ) continue;
                var day = days[split[0]];
                var hour = split[1];
                if( !day ) continue;
                var index = disabled.indexOf(day);
                if (index !== -1) disabled.splice(index, 1);
                if( mapHours[day] )
                {
                    mapHours[day].push(hour);
                } else 
                {
                    mapHours[day] = [hour];
                }
            }
            activity.mapHours = mapHours;
            return disabled
        }   

        function getOptionsFor(activity)
        {
            var today = new Date()
            var weekDaysDisabled = getWeekDaysDisabled(activity);
            
            while ( weekDaysDisabled.length != 7 &&  weekDaysDisabled.indexOf(today.getDay()) != -1 )
            {
                today = new Date(today.getTime() + 86400000);
            }
            
            return {
                callback: function(val) { //Mandatory

                    var date = new Date(val);
    
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var dayOfWeek = date.getDay();
                    
                    activity.availabeHours = activity.mapHours[dayOfWeek];
                    //TODO activity hours list

                    $scope.selectedDate = day + '/' + month + '/' + year;
                },
                from: new Date(), //Optional
                inputDate: today, //Optional
                titleLabel: 'Seleccione una fecha',
                mondayFirst: true, //Optional
                disableWeekdays: weekDaysDisabled, //Optional
                closeOnSelect: false, //Optional
                templateType: 'popup',
                setLabel: 'Elegir',
                closeLabel: 'Cerrar'
            }
        }

        $scope.openDatePicker = function(activity) 
        {
            ionicDatePicker.openDatePicker(getOptionsFor(activity));
        };

        $scope.$on('$ionicView.beforeEnter', function() 
        {
            $scope.activities = getGymActivities()
            $scope.gymName = getGymName()
        });

    })

    //Personal Trainers
    .controller('PersonalCtrl', function($scope, $ionicPopup, $state, gymData, sharedCartService) {
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

        $scope.$on('$ionicView.beforeEnter', function() 
        {
            var trainers =  gymData.getActualGym().trainers;
            var transformedTrainers = [];
            for( var i = 0; i < trainers.length; i++ )
            {
                transformedTrainers.push({
                    name: trainers[i].name,
                    price: trainers[i].price,
                    age: trainers[i].age,
                    speciality: trainers[i].specialty,
                    profileImage: trainers[i].image,
                    _id: trainers[i]._id
                });
            }
            $scope.trainers = transformedTrainers;
        })
    })

    .controller('RopaCtrl', function($scope, $state, $ionicPopup, sharedCartService, 
        $ionicHistory, $http, $ionicLoading, gymData, base64, userData) {
        $scope.groups = [];
        $scope.totalAlquilados = 0;
        $scope.cantidadAlquilados = 0;
        $scope.itemsAlquilados = [];
        //global variable shared between different pages.
        var cart = sharedCartService.cart;
        $scope.$on('$ionicView.beforeEnter', function() 
        {
            makeGymGroups()
        })
       
        
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
                img: product.image,
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
            var image = item.img;
            var name = item.name;
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: '<div><div> <img ng-src="' + image + '" style="width:100%"/> </div> <div>' +
                    ' Desea alquilar ' + genero + '<b>' + name + '</b> para su actividad? </div></div>',
                okText: 'Alquilar',
                cancelText: 'Cancelar'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    sharedCartService.addGymPassClothes(item._id, name, item.precio)
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
            return activity.day + " a las " + activity.time + "hs"
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
                        $ionicLoading.show({
                            template: "Cargando..."
                        })
                        var str = "api/users/" + userData.get()._id + "/gym-passes";
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
                             cart.add(response._id, url, getActivityName(), calculatePassPrice(), 1, getGymName(), "Fecha y hora: " + getActivtyDescription(),
                                    "Personal trainer: " + getPersonalTrainer(), "Ropa: " + getClothesList());
                            var alertPopup = $ionicPopup.alert({
                                title: 'Exito',
                                template: 'Compra exitosa'
                            }).then(function(){
                                $ionicHistory.clearHistory();
                                $scope.itemsAlquilados = [];
                                $scope.cantidadAlquilados = 0;
                                $scope.totalAlquilados = 0;
                                $state.go("tab.cart", {
                                    fromActivity: true
                                });
                                
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
