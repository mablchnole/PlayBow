var myApp = angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'material.svgAssetsCache',
  'ngFileUpload',
  'msieurtoph.ngCheckboxes'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html',
    }).
    when('/addplaymate', {
      templateUrl: '/views/addplaymate.html',
      controller: 'PlaymateController'
    }).
    when('/allplaymates', {
      templateUrl: '/views/allplaymates.html',
      controller: 'PlaymateController'
    }).
    when('/profile', {
      templateUrl: '/views/profile.html',
      controller: 'ProfileController'
    }).
    when('/matches', {
      templateUrl: '/views/matches.html',
      controller: 'ProfileController'
    }).
    when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: 'PlaymateController'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);
