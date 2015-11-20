
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia;
    //get a reference to the element by css selector
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var snapshot = document.querySelector('img');
    var ctx = canvas.getContext('2d');
    var videoStream;

    //takes a javascript object with some properties
    //and a function that takes a stream
    //and a function that is the error callback
    //need to use a local webserver for it to work in crome if you don't use webstorm
    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        //creates a url that is bound to an input stream
        video.src = window.URL.createObjectURL(stream);
    }, function(err) {
       console.error(err);
    });

    //take a snapshot and send it to the canvas on click
    video.addEventListener('click', function() {
        if(videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            //can take a source
            ctx.drawImage(video, 0, 0);
        }
    })

    var mousedown = false;
    document.addEventListener('mousedown', function(evt) {
        mousedown = true;
        var canvasX = evt.clientX - canvas.offsetLeft + window.scrollX;
        var canvasY = evt.clientY - canvas.offsetTop + window.scrollY;
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
    });

    document.addEventListener('mousemove', function(evt) {
        if(mousedown) {
            var canvasX = evt.clientX - canvas.offsetLeft;
            var canvasY = evt.clientY - canvas.offsetTop + window.scrollY;
            ctx.strokeStyle = '#FFFF00';
            ctx.lineTo(canvasX, canvasY);
            ctx.stroke();
        }
    });

    document.addEventListener('mouseup', function(evt) {
        var canvasX = evt.clientX - canvas.offsetLeft;
        var canvasY = evt.clientY - canvas.offsetTop + window.scrollY;
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();
        mousedown = false;
    });

    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        snapshot.src = canvas.toDataURL();
    })

});

