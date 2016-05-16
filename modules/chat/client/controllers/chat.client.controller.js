'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket',
  function ($scope, $location, Authentication, Socket) {
    // Create a messages array
    $scope.messages = [];

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.unshift(message);
    });
    // Create a controller for BLAST button
    $scope.sendBlast = function () {
      console.log('msg; ', $scope.messages[0].text)
      var old = parseInt($scope.messages[0].text)
      var myCard = Math.floor(Math.random()*13) + 1
      if (old > myCard) {
        var message = {
          text: myCard + ' Your Card ' + ' is higher than ' + old + ' SO YOU WIN!'
        };
      } else if (old === myCard) {
        var message = {
          text: myCard + ' Your Card ' + ' is the same as ' + old + ' SO YOU TIE!'
        };
      } else {
        var message = {
          text: myCard + ' Your Card ' + ' is lower than ' + old +' SO YOU LOSE!'
        };
      }

      Socket.emit('chatMessage', message)
    };

    $scope.guessBlast = function () {
      var dealerUp = Math.floor(Math.random()*13) + 1
      var dealerDown = Math.floor(Math.random()*13) + 1
      var message = {
        text: dealerUp
      };
      Socket.emit('chatMessage', message);
    };

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);
