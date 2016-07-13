var myApp = angular.module('myApp', [
  'ngRoute',
  'ngFileUpload'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html'
    }).
    when('/addplaymate', {
      templateUrl: '/views/addplaymate.html',
      controller: 'PlaymateController'
    }).
    when('/showplaymates', {
      templateUrl: '/views/showplaymates.html',
      controller: 'PlaymateController'
    }).
    when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: 'PlaymateController'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);
