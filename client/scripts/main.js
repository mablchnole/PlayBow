var myApp = angular.module('myApp', [
  'ngRoute'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: '/views/home.html'
    }).
    when('/addplaymate', {
      templateUrl: '/views/addplaymate.html'
    }).
    otherwise({
    redirectTo: 'home'
  });
}]);
