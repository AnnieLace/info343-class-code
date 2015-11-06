
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //create a reference to the firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        //any time the array changes it is synchronized to the server and local copy
        $scope.messages = $firebaseArray(ref);
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            //adds a new object to the array and synchronizes with the server
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.ServerValue.TIMESTAMP
            });

            $scope.body = null;
        }; //sendMessage()
    });
