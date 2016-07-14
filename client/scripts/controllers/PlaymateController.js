angular.module('myApp').controller('PlaymateController', [
  '$scope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $http, $window, $location, Upload) {
    console.log('paws on PlaymateController');
    $scope.allPlaymates = [];
    $scope.favePlaymates = [];

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
          size: $scope.sizeIn
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
        // clears out our input
        $scope.nameIn = '';
        $scope.breedIn = '';
        $scope.ageIn = '';
        $scope.genderIn = '';
        $scope.sterileIn = '';
        $scope.vaccinatedIn = '';
        $scope.sizeIn = '';

        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        // getImages();
        $scope.displayPlaymates();
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

    // loads page with images, DO I NEED THIS GET METHOD???
    // function getImages() {
    //   $http.get('/uploads')
    //   .then(function(response) {
    //       $scope.uploads = response.data;
    //       console.log('GET /uploads ', response.data);
    //   });
    // } // end getImages


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
        vaccinated: $scope.allPlaymates[index].vaccinated,
        location: $scope.allPlaymates[index].location
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











}]);
