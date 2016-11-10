angular.module('DashboardMod').controller('DashboardCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.getUser = function() {
    console.log('Getting User ... ');

    $http.get('/getuser')
      .then(function onSuccess(user) {
        $scope.user = user.data;
        console.log(user.data);
      })
      .catch(function onError(err) {
        console.log(err);
      })
  }
}])
