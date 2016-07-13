console.log("my dogs thinks i'm pretty awesome");

var myApp = angular.module('myApp', [
  'ngRoute'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html'
    }).
    when('/addplaymate', {
      templateUrl: '/views/addplaymate.html',
      controller: 'AddPlaymateController'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);
