myApp.controller('AddPlaymateController', ['$scope', '$http', function($scope, $http) {
  console.log('paws on AddPlaymateController');

  $scope.addPlaymate = function(){
    event.preventDefault();
    console.log('addPlaymate button clicked');
    // get the input and store in object
    var playmateToSend = {
      name: $scope.nameIn,
      breed: $scope.breedIn,
      age: $scope.breedIn,
      gender: $scope.genderIn
    }; // end playmateToSend
    console.log('sending to server:', playmateToSend);

    $http({
      method: 'POST',
      url: '/addPlaymate',
      data: playmateToSend
    }); // end post route

    // clears input fields
    $scope.nameIn = '';
    $scope.breedIn = '';
    $scope.breedIn = '';
    $scope.genderIn = '';
  }; // end addPlaymate








}]);
