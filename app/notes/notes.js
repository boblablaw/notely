'use strict';

var notelyBasePath = 'https://elevennote-nov-2014.herokuapp.com/api/v1/';
var apiKey = '$2a$10$mDt9tMv4Qc2A5GAO6uS8b.f3SfpxjMgkF/t9IW2eXdPFPsV5LnAZ.';

angular.module('notely.notes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/notes', {
    templateUrl: 'notes/notes.html',
    controller: 'NotesController'
  });
}])

.controller('NotesController', ['$scope', 'NotesBackend', function($scope, NotesBackend) {
  NotesBackend.fetchNotes();

  $scope.notes = function() {
    return NotesBackend.getNotes();
  };

  $scope.commit = function() {
    NotesBackend.postNote($scope.note);
    $scope.note.title = '';
    $scope.note.body = '';
  };
}])

.service('NotesBackend', ['$http', function($http) {
  var notes = [];

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    $http.get(notelyBasePath + 'notes.json?api_key=' + apiKey)
    .success(function(notes_data) {
        notes = notes_data;
      });
  };

  this.postNote = function(note_data) {
    $http.post(notelyBasePath + 'notes', {
      api_key: apiKey,
      note: note_data
    }).success(function(new_note_data) {
      notes.push(new_note_data);
    });
  };
}]);
