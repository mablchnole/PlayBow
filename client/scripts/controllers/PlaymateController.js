myApp.controller('PlaymateController', ['$scope', '$http', function($scope, $http) {
  console.log('paws on AddPlaymateController');
  $scope.allPlaymates = [];

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
    $scope.allPlaymates.push(playmateToSend);
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

}]);
