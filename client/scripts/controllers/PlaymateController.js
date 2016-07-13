angular.module('myApp').controller('PlaymateController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {
    console.log('paws on AddPlaymateController');
    $scope.allPlaymates = [];
    $scope.favePlaymates = [];

    ////////////////////////////////////////////////////////////
    //            ADDING & DELETING NEW PLAYMATES             //
    ////////////////////////////////////////////////////////////

    // collect data for new playmate and send to server
    $scope.addPlaymate = function(){
      event.preventDefault();
      console.log('addPlaymate button clicked');

      // get the input and store in object
      var playmateToSend = {
        name: $scope.nameIn,
        breed: $scope.breedIn,
        age: $scope.ageIn,
        gender: $scope.genderIn,
        sterile: $scope.sterileIn,
        vaccinated: $scope.vaccinatedIn
      }; // end playmateToSend

      console.log('sending to server:', playmateToSend);

      // post route to send new data to server
      $http({
        method: 'POST',
        url: '/addPlaymate',
        data: playmateToSend
      }).then(function() {
        $scope.displayPlaymates();
      }); // end post route

      // clears input fields
      $scope.nameIn = '';
      $scope.breedIn = '';
      $scope.ageIn = '';
      $scope.genderIn = '';
      $scope.sterileIn = '';
      $scope.vaccinatedIn = '';
    }; // end addPlaymate

    // get route to retrieve data from server to display
    $scope.displayPlaymates = function() {
      // retrieve data from server
      $http({
        method: 'GET',
        url: '/getPlaymates'
      }).then(function(response) {
        $scope.allPlaymates = response.data;
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
        name: $scope.allPlaymates[index].name,
        breed: $scope.allPlaymates[index].breed,
        age: $scope.allPlaymates[index].age,
        gender: $scope.allPlaymates[index].gender,
        sterile: $scope.allPlaymates[index].sterile,
        vaccinated: $scope.allPlaymates[index].vaccinated
      };
      console.log('sending fave to server:', faveToSend);
      // post route to send fave to server
      $http({
        method: 'POST',
        url: '/addFave',
        data: faveToSend
      }).then(function() {
        $scope.displayFaves();
      }); // end post route
    }; // end addFave

    // get route to retrieve faves from server to display
    $scope.displayFaves = function() {
      // retrieve data from server
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

    // remove fave from fave list
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

    ////////////////////////////////////////////////////////////
    //               IMAGE UPLOADING FUNCTIONS                //
    ////////////////////////////////////////////////////////////

    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
          console.log('file', $scope.file);
      }
    }; // end submit

    // loads page with images
    function getImages() {
      $http.get('/uploads')
      .then(function(response) {
          $scope.uploads = response.data;
          console.log('GET /uploads ', response.data);
      });
    } // end getImages

    $scope.upload = function(file) {
      Upload.upload ({
        url: '/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        } // end data
      }).then(function(resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          getImages();
      }, function(resp) {
          console.log('Error status: ' + resp.status);
      }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
  }; // end upload function




}]);
