angular.module('myApp').controller('PlaymateController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload) {
    $rootScope.allPlaymates = [];
    $scope.favePlaymates = [];
    $scope.playstyles = [];

    ////////////////////////////////////////////////////////////
    //  ADDING NEW PLAYMATE, IMAGES & POST METHOD TO SERVER   //
    ////////////////////////////////////////////////////////////

    // upload image on submit
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
          console.log('in submit function, file to upload:', $scope.file);
      }
    }; // end submit function

    // upload image to aws and input data to database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        } // end data
      }).then(function(resp) {
        console.log('in then success block, upload method:', resp.data.location);

        // collect user input to send to database
        var playmateToSend = {
          name: $scope.nameIn,
          breed: $scope.breedIn,
          age: $scope.ageIn,
          gender: $scope.genderIn,
          sterile: $scope.sterileIn,
          vaccinated: $scope.vaccinatedIn,
          location: resp.data.location,
          size: $scope.sizeIn,
          playstyles: $scope.playstyles
        };
        console.log('sending to server:', playmateToSend);
        // post method to send input data to database
        $http({
          method: 'POST',
          url: '/addPlaymate',
          data: playmateToSend
        }).then(function() {
          $scope.displayPlaymates();
        });

        // function to bind list of checkbox options and push to one array
        $scope.add = function(value) {
          if (!angular.isArray($scope.playstyles)) {
            $scope.playstyles = [];
          }
          if (-1 === $scope.playstyles.indexOf(value)) {
            $scope.playstyles.push(value);
            console.log('checkbox function array:', $scope.playstyles);
          }
        }; // end add function
        // not currently using this but may want to in the future
        $scope.remove = function(value) {
          if (!angular.isArray($scope.playstyles)) {
            return;
          }
          var index = $scope.playstyles.indexOf(value);
          if (-1 !== index) {
            $scope.playstyles.splice(index, 1);
          }
        }; // end remove function

        // clears out our input fields
        $scope.nameIn = '';
        $scope.breedIn = '';
        $scope.ageIn = '';
        $scope.genderIn = '';
        $scope.sterileIn = '';
        $scope.vaccinatedIn = '';
        $scope.sizeIn = '';

        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        // $scope.displayPlaymates();
        $location.path('/profile');
      }, function(resp) {
          console.log('Error status: ' + resp.status);
      }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }; // end upload function

    ////////////////////////////////////////////////////////////
    //  DISPLAYING PLAYMATE, IMAGES & GET METHODS TO SERVER   //
    ////////////////////////////////////////////////////////////

    // get method to retrieve data from server to display
    $scope.displayPlaymates = function() {
      // retrieve data from server
      $http({
        method: 'GET',
        url: '/getPlaymates'
      }).then(function(response) {
        $rootScope.allPlaymates = response.data;
        console.log('so many new furiends!', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayPlaymates
    $scope.displayPlaymates();

    ////////////////////////////////////////////////////////////
    //           ADDING & REMOVING FROM FAVES LIST            //
    ////////////////////////////////////////////////////////////

    // send selected favorites to the database
    $scope.addFave = function(index){
      console.log('addFave button clicked');
      var faveToSend = {
        name: $rootScope.allPlaymates[index].name,
        breed: $rootScope.allPlaymates[index].breed,
        age: $rootScope.allPlaymates[index].age,
        gender: $rootScope.allPlaymates[index].gender,
        sterile: $rootScope.allPlaymates[index].sterile,
        vaccinated: $rootScope.allPlaymates[index].vaccinated,
        location: $scope.allPlaymates[index].location
      };
      console.log('sending fave to server:', faveToSend);
      // post method to send fave to server
      $http({
        method: 'POST',
        url: '/addFave',
        data: faveToSend
      }).then(function() {
        $scope.displayFaves();
      }); // end post route
    }; // end addFave

    // retrieve faves from server to display
    $scope.displayFaves = function() {
      // get method to retrieve faves
      $http({
        method: 'GET',
        url: '/getFaves'
      }).then(function(response) {
        $scope.favePlaymates = response.data;
        console.log('so many fave furiends!', response.data);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayPlaymates
    $scope.displayFaves();

    // delete fave from list and database
    $scope.removeFave = function(faveId) {
      var idToSend = {
        id: faveId
      };
      console.log(faveId);
      $http ({
        method: 'DELETE',
        url: '/removeFave',
        data: idToSend,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      }).then(function() {
        $scope.displayFaves();
        console.log('back from server in removeFave');
      });
    }; // end removeFave

    // filter all playmates by playstyles
    $scope.filterFunction = function(element) {
      return element.name.match(/^Ma/) ? true : false;
    };


}]);
