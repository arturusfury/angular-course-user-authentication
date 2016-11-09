angular.module('LoginMod').controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('Login Controller initialized...');

  $scope.runLogin = function() {
    $http.put('/login', {
      email: $scope.email,
      password: $scope.password
    }).then(function onSuccess() {
      window.location('/')
    }).catch(function onError(err) {
      if (err.status == 400 || 404) {
        
      }
    })
  }
}])
