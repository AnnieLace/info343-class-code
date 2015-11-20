/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //ask the user for permission to show notifications on the screen
    function askPermission() {
        Notification.requestPermission(function(result) {
           if('granted' === result) {
               showNotification('Thanks!', 'You will now see my notifications');
           }
        });
    }

    function showNotification(title, body) {
        var note = new Notification(title, {body: body, icon: 'img/notification.png'});

        //bind tells the close method which not to close when it gets invoked
        //it works because functions are objects in javascript...
        window.setTimeout(note.close.bind(note), 3000);
    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function() {
       switch(Notification.permission) {
           case 'granted':
               showNotification('Hello', 'triggered at ' + new Date().toLocaleTimeString());
               break;
           case 'denied':
               alert('Please enable notifications!');
               break;
           default:
               askPermission();
       }
    });
});
