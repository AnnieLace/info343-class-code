/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //don't use angular for a game
    //raw javascript is best because you want it to be fast
    var canvas = document.getElementById('game-canvas');
    //2D rendering context
    var ctx = canvas.getContext('2d');
    //current game state
    var gameState;

    //create a new game state object
    function newGameState() {
        return {
            ball: {
                //coords
                left: Math.random() * canvas.width,
                top: Math.random() * canvas.height,
                //round ball with radius 5
                //width and height of bounding rectangle
                width: 10,
                height: 10,
                //direction of motion
                vectorX: 1,
                vectorY: 1,
                velocity: 1
            },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height / 6
            },
            //millisecond value with microsecond accuracy
            lastTimestamp: performance.now()
        }
    }

    //render current game state element to canvas
    function render() {
        //clears entire canvas
        //x, y, width, height
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;
        //draw a circle
        ctx.beginPath();
        //x coord, y coord of center, radius,
        ctx.arc(ball.left + (ball.width/2),
        ball.top + (ball.height/2),
        ball.width / 2, 0, 2*Math.PI);
        //fills in circle in the browser
        ctx.fill();

        //render paddle
        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);

    }//end render

    //advance the animation by one step
    function step() {
        var ball = gameState.ball;
        //move the ball
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        //bounce off right wall
        if(ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }

        //bounce off top and bottom
        if(ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        //bounce off paddle
        var paddle = gameState.paddle;
        if(ball.left <= paddle.left + paddle.width) {
            //if the bottom of the ball is at or below
            //the top of the paddle bounce it off
            if(ball.top + ball.height >= paddle.top
             && ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            }
            else {
                //game over
                ctx.font = '20px Helvetica';
                var message = 'Game Over';
                //center game over message on midpoint of text
                //get width of text
                var metrics = ctx.measureText(message);

                ctx.fillText(message, (canvas.width - metrics.width) / 2,
                    //set height at 20px in the ctx.font assignment
                    (canvas.height - 20) / 2);
                return false;
            }
        }
        return true;
    }

    function animate(timestamp) {
        var keepGoing = true;
        render();
        //only advance the game state at a rate of about 60 frames per second
        if(timestamp - gameState.lastTimestamp > 16) {
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }
        //if game is still going, keep animating
        if(keepGoing) {
            requestAnimationFrame(animate);
        }
    }

    //listen for mouse movement to controll the paddle
    document.addEventListener('mousemove', function(evt) {
        //make mouse track with position relative to the canvas element
        //rather than the entire page (which is what clientY gives)
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        //stick mouse to center of paddle
        paddle.top = canvasY - (paddle.height/2);
    });

    gameState = newGameState();

    //ask browser to animate as quickly as possible
    requestAnimationFrame(animate);



    /* Stuff for messing around
    //default is black
    //color can be changed to anything in terms of css colors
    //anything called with fill in the title has this fill style
    ctx.fillStyle = 'rgba(255,0,0,0.6)';
    //(left top) x coord, y coord, width, height
    //coordinate system is the same as drawing panel
    ctx.fillRect(20,20, 50, 60);

    ctx.fillStyle = 'rgba(0, 0, 255, 0.6)';
    ctx.fillRect(40, 40, 50, 60);

    //change to black for text labels
    cxt.fillStyle = '#000';
    var idx;
    //create row of number labels across the top
    for(idx = 0; idx < canvas.width; idx += 20) {
        //label, x coord, y coord
        ctx.fillText(idx, idx, 10);
    }
    //create column of number labels across the left side
    for(idx = 0; idx < canvas.height; idx += 20) {
        ctx.fillText(idx, 0, idx);
    }*/


});
