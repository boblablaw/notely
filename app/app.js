'use strict';

// Declare app level module which depends on views, and components
angular.module('notely', [
  'ngRoute',
  'notely.view1',
  'notely.view2',
  'notely.version',
  'notely.notes'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/notes'});
}]);
