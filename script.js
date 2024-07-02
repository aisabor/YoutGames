// script.js

// Array of video file paths and their corresponding winners/losers
const videos = [
    { src: 'media/game1.mp4', winner: 'player1' }, // winner
    { src: 'media/game2.mp4', winner: 'player2' }, // loser
    { src: 'media/game3.mp4', winner: 'player1' }, // winner
    { src: 'media/game4.mp4', winner: 'player2' },  // loser
    { src: 'media/game5.mp4', winner: 'player1' }, // winner
    { src: 'media/game6.mp4', winner: 'player2' }  // loser
];

// Current selected video
let currentVideo = null;

// Function to select a random video
function selectRandomVideo() {
    const video = document.getElementById('gameVideo');
    const randomIndex = Math.floor(Math.random() * videos.length);
    currentVideo = videos[randomIndex];
    video.src = currentVideo.src;
    video.load();
    video.play();

    // Reset result display
    document.getElementById('result').innerHTML = '';
}

// Simulate a backend for storing predictions
const predictions = {};

// Function to handle prediction submission
function submitPrediction(winner) {
    if (!currentVideo) {
        alert('Please select a video first!');
        return;
    }
    const video = document.getElementById('gameVideo');
    const currentTime = video.currentTime;

    // Store the prediction
    predictions[currentTime] = winner;

    console.log(`Prediction submitted: ${winner} at ${currentTime} seconds`);

    // Display a confirmation message
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Prediction submitted: ${winner}`;
}

// Function to display the actual winner after video ends
function displayWinner() {
    if (!currentVideo) return;

    const actualWinner = currentVideo.winner;
    const resultDiv = document.getElementById('result');
    
    // Check if there was a prediction and if it was correct
    const predictedWinner = Object.values(predictions).pop();
    const correct = predictedWinner === actualWinner;

    // Display alert prompting user to reveal prize
    alert('Click the reveal button for your prize!');

    // Update the leaderboard with a hidden winner
    const leaderboard = document.getElementById('leaderboard');
    const entry = document.createElement('li');
    entry.innerHTML = `Video: ${currentVideo.src.split('/').pop()} - Prediction: <span class="hidden-winner">Hidden</span> <button onclick="revealWinner(this, '${actualWinner}', ${correct})">Reveal</button>`;
    leaderboard.appendChild(entry);
}

// Function to reveal the winner and coins gained
function revealWinner(button, actualWinner, correct) {
    const hiddenWinner = button.previousSibling;
    hiddenWinner.textContent = `Actual winner: ${actualWinner}. ${correct ? 'You gained 10 coins!' : 'Better luck next time!'}`;
    button.remove();
}

// Function to create and animate bubbles
function triggerBubbleBurst() {
    const container = document.createElement('div');
    container.className = 'bubbles';
    document.body.appendChild(container);

    for (let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        container.appendChild(bubble);

        // Remove the bubble after the animation is done
        bubble.addEventListener('animationend', () => bubble.remove());
    }

    // Remove the container after the animation is done
    setTimeout(() => container.remove(), 600);
}

// Initialize video events
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('gameVideo');

    // Event listener for when the video ends
    video.addEventListener('ended', displayWinner);
});


$(function() {
    var numberOfStars = 200;

    for (var i = 0; i < numberOfStars; i++) {
        $('.congrats').append('<div class="blob fa fa-star ' + i + '"></div>');
    }

    // Trigger the animation on page load for demonstration
    animateText();
    animateBlobs();
});

$('.congrats').click(function() {
    reset();
    animateText();
    animateBlobs();
});

function reset() {
    $.each($('.blob'), function(i) {
        TweenMax.set($(this), { x: 0, y: 0, opacity: 1 });
    });

    TweenMax.set($('h1'), { scale: 1, opacity: 1, rotation: 0 });
}

function animateText() {
    TweenMax.from($('h1'), 0.8, {
        scale: 0.4,
        opacity: 0,
        rotation: 15,
        ease: Back.easeOut.config(4),
    });
}

function animateBlobs() {
    var xSeed = _.random(350, 380);
    var ySeed = _.random(120, 170);

    $.each($('.blob'), function(i) {
        var $blob = $(this);
        var speed = _.random(1, 5);
        var rotation = _.random(5, 100);
        var scale = _.random(0.8, 1.5);
        var x = _.random(-xSeed, xSeed);
        var y = _.random(-ySeed, ySeed);

        TweenMax.to($blob, speed, {
            x: x,
            y: y,
            ease: Power1.easeOut,
            opacity: 0,
            rotation: rotation,
            scale: scale,
            onStartParams: [$blob],
            onStart: function($element) {
                $element.css('display', 'block');
            },
            onCompleteParams: [$blob],
            onComplete: function($element) {
                $element.css('display', 'none');
            }
        });
    });
}

// Function to show the congratulatory animation
function showCongratulationAnimation() {
    animateText();
    animateBlobs();
}

// Call this function when the player wins
function onPlayerWin() {
    showCongratulationAnimation();
}

