// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('gym2go', ['ionic', 'gym2go.controllers', 'gym2go.services', 'ngCordova', 'ngMap', 'ionic-datepicker'])

app.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
fromActivity
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (fromState.name.indexOf('cart') !== -1) {
      fromParams['fromActivity'] = null
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.gyms', {
    url: '/gyms',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/tab-gyms.html',
        controller: 'GymsCtrl'
      }
    }
  })

.state('tab.activities', {
    url: '/gym',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/tab-activities.html',
        controller: 'SingleGymCtrl'
      }
    }
  })

  .state('tab.McGym', {
    url: '/McGym',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/gyms/tab-McGym.html',
        controller: 'SingleGymCtrl'
      }
    }
  })

  .state('tab.GymFiuba', {
    url: '/GymFiuba',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/gyms/tab-GymFiuba.html',
        controller: 'SingleGymCtrl'
      }
    }
  })

  .state('tab.GymBelgrano', {
    url: '/GymBelgrano',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/gyms/tab-GymBelgrano.html',
        controller: 'SingleGymCtrl'
      }
    }
  })

  .state('tab.GymIndep', {
    url: '/GymIndep',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/gyms/tab-GymIndep.html',
        controller: 'SingleGymCtrl'
      }
    }
  })

  .state('tab.GymST', {
    url: '/GymST',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/gyms/tab-GymST.html',
        controller: 'SingleGymCtrl'
      }
    }
  })
  .state('tab.personalTrainerList', {
    url: '/personal',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/personal-trainer-list.html',
        controller: 'PersonalCtrl'
      }
    }
  })

  .state('tab.supps', {
      url: '/supps',
      views: {
        'tab-supps': {
          templateUrl: 'templates/tab-supps.html',
          controller: 'SuppsCtrl'
        }
      }
    })

  .state('tab.cart', {
    url: '/cart/:fromActivity',
    views: {
      'tab-cart': {
        templateUrl: 'templates/tab-cart.html',
        controller: 'CartCtrl'
      }
    }
  })

  .state('tab.clothes', {
    url: '/clothes',
    views: {
      'gyms-tab': {
        templateUrl: 'templates/ropa-rent.html',
        controller: 'RopaCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});