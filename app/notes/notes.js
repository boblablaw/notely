'use strict';

angular.module('notely.notes', ['ngRoute', 'textAngular'])

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

  $scope.hasNotes = function() {
    return $scope.notes().length > 0;
  };

  $scope.saveNote = function() {
    if ($scope.note.id) {
      NotesBackend.updateNote($scope.note);
    } else {
      //Implement callback
      NotesBackend.postNote($scope.note, function(newNote) {
        $scope.note = JSON.parse(JSON.stringify(newNote));
      });
    }
  };

  $scope.clearNote = function() {
    $scope.note = {};
    $scope.$broadcast('noteCleared'); // implement directive
  };

  $scope.destroy = function(note) {
    NotesBackend.deleteNote(note, function() {
      $scope.clearNote();
    });
  };

  $scope.loadNote = function(note) {
    $scope.note = JSON.parse(JSON.stringify(note));
  };

  $scope.buttonText = function(note) {
    return (note && note.id) ? 'Update Note' : 'Create Note';
  };

  $scope.findNoteById = function(noteId) {
    var notes = $scope.notes();
    for (var i= 0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i];
      }
    }
  };
}]);
