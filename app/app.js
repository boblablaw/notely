'use strict';

var notelyBasePath = 'https://elevennote-nov-2014.herokuapp.com/api/v1/';
var apiKey = '$2a$10$mDt9tMv4Qc2A5GAO6uS8b.f3SfpxjMgkF/t9IW2eXdPFPsV5LnAZ.';

// Declare app level module which depends on views, and components
angular.module('notely', [
  'ngRoute',
  'notely.notes',
  'notely.login'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.directive('focusOn', function() {
  return function(scope, elem, attr) {
    scope.$on(attr.focusOn, function() {
      elem[0].focus();
    });
  };
})

.service('NotesBackend', ['$http', function($http) {
  var notes = [];
  var self = this;

  this.getNotes = function() {
    return notes;
  };

  this.fetchNotes = function() {
    $http.get(notelyBasePath + 'notes.json?api_key=' + apiKey)
    .success(function(notes_data) {
        notes = notes_data;
      });
  };

  this.postNote = function(noteData, callback) {
    $http.post(notelyBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
      notes.push(newNoteData);
      callback(newNoteData);
    });
  };

  this.updateNote = function(note) {
    $http.put(notelyBasePath + 'notes/' + note.id, {
      api_key: apiKey,
      note: note})
      .success(function(response){
        self.fetchNotes();
      });
  };

  this.deleteNote = function(note, callback) {
    $http.delete(notelyBasePath + 'notes/' + note.id + 'notes.json?api_key=' + apiKey)
      .success(function(response) {
        self.fetchNotes();
        callback();
      });
    };
}]);
