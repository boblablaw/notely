'use strict';

angular.module('notely.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', ['$scope', function($scope) {
  $scope.submit = function() {
    console.log('hello');
  };
}]);
