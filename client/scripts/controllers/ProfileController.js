angular.module('myApp').controller('ProfileController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload) {
    $rootScope.playmateProfile = [];
    $rootScope.allPlaymates = [];
    $rootScope.playmateMatches = [];


    // get method to retrieve all playmates
    $scope.getPlaymatesToFilter = function() {
      // retrieve data from server
      $http({
        method: 'GET',
        url: '/getPlaymatesToFilter'
      }).then(function(response) {
        $rootScope.allPlaymates = response.data;
        console.log('all', $rootScope.allPlaymates);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end getPlaymatesToFilter
    $scope.getPlaymatesToFilter();

    // get method to retrieve newest playmate created from server
    $scope.displayProfile = function() {
      $http({
        method: 'GET',
        url: '/getNewest'
      }).then(function(response) {
        $rootScope.playmateProfile = response.data;
        console.log('YES! Newest playmate:', $rootScope.playmateProfile);
        // find matches for this profile
        for(var i=0; $rootScope.allPlaymates.length > i; i++) {
          console.log('inside for loop, all playmates accessed:', $rootScope.allPlaymates);
          console.log('inside for loop, accessing new playmate:', $rootScope.playmateProfile);
          console.log('playmate profile playstyle', $rootScope.playmateProfile[0].playstyles[0]);
          console.log('loop through all and access playstyle', $rootScope.allPlaymates[i].playstyles[0]);
          // if this playmate's playstyle 1, 2 & 3 matches any in all playmate playstyles
          // then push this playmate to an array to displayProfile
          if($rootScope.playmateProfile[0].playstyles[0] === $rootScope.allPlaymates[i].playstyles[0] || $rootScope.playmateProfile[0].playstyles[1] === $rootScope.allPlaymates[i].playstyles[1] || $rootScope.playmateProfile[0].playstyles[2] === $rootScope.allPlaymates[i].playstyles[2]) {
            $rootScope.playmateMatches.push($rootScope.allPlaymates[i]);
          } else {
            return false;
          }
        }

      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayProfile
    $scope.displayProfile();

    // function to display all matches




}]);
