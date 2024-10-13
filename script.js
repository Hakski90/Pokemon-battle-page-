let rolling = false;
let buttonAbove = false;  // Track if the button is above or below
let homeTeam = {
    squirtle: 100,
    charmander: 100
};

let awayTeam = {
    squirtle: 100,
    charmander: 100
};
function rollDice() {
    if (rolling) return;  // Prevent multiple clicks during animation

    rolling = true;
	toggleButtonPosition();  // Change the button's position
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('inactive-dot')); // Reset all dots to active

    var rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        showDiceFace(random);
    }, 100);  // Change dice face every 100ms to simulate rolling

    setTimeout(() => {
        clearInterval(rollInterval);  // Stop the rapid rolling animation
        let finalNumber = Math.floor(Math.random() * 6) + 1;
        showDiceFace(finalNumber);    // Show the final rolled number
        rolling = false;
    }, 1000);  // The rolling animation lasts for 1 seconds
}

function showDiceFace(number) {
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.add('inactive-dot')); // Make all dots inactive

    switch (number) {
        case 1:
            document.getElementById('dot5').classList.remove('inactive-dot'); // Center dot
            break;
        case 2:
            document.getElementById('dot1').classList.remove('inactive-dot'); // Top-left
            document.getElementById('dot9').classList.remove('inactive-dot'); // Bottom-right
            break;
        case 3:
            document.getElementById('dot1').classList.remove('inactive-dot'); // Top-left
            document.getElementById('dot5').classList.remove('inactive-dot'); // Center
            document.getElementById('dot9').classList.remove('inactive-dot'); // Bottom-right
            break;
        case 4:
            document.getElementById('dot1').classList.remove('inactive-dot'); // Top-left
            document.getElementById('dot3').classList.remove('inactive-dot'); // Top-right
            document.getElementById('dot7').classList.remove('inactive-dot'); // Bottom-left
            document.getElementById('dot9').classList.remove('inactive-dot'); // Bottom-right
            break;
        case 5:
            document.getElementById('dot1').classList.remove('inactive-dot'); // Top-left
            document.getElementById('dot3').classList.remove('inactive-dot'); // Top-right
            document.getElementById('dot5').classList.remove('inactive-dot'); // Center
            document.getElementById('dot7').classList.remove('inactive-dot'); // Bottom-left
            document.getElementById('dot9').classList.remove('inactive-dot'); // Bottom-right
            break;
        case 6:
            document.getElementById('dot1').classList.remove('inactive-dot'); // Top-left
            document.getElementById('dot3').classList.remove('inactive-dot'); // Top-right
            document.getElementById('dot4').classList.remove('inactive-dot'); // Middle-left
            document.getElementById('dot6').classList.remove('inactive-dot'); // Middle-right
            document.getElementById('dot7').classList.remove('inactive-dot'); // Bottom-left
            document.getElementById('dot9').classList.remove('inactive-dot'); // Bottom-right
            break;
    }
}
// Function to change background color and sync inactive dot color
function changeBackgroundColor(color) {
	let dice = document.getElementById('dice');
	dice.style.backgroundColor = color;
	let inactiveDots = document.querySelectorAll('.inactive-dot');
	inactiveDots.forEach(dot => {
		dot.style.backgroundColor = color; // Update inactive dots to match new background
	});
}
function toggleButtonPosition() {
    const diceContainer = document.getElementById('dice-container');
    const button = document.getElementById('roll-btn');
    
    if (buttonAbove) {
        diceContainer.appendChild(button);  // Move button to below the dice
    } else {
        diceContainer.insertBefore(button, diceContainer.firstChild);  // Move button to above the dice
    }
    
    buttonAbove = !buttonAbove;  // Toggle the state
}
function updateHealthBar(pokemon, team, health) {
    // Find the correct health bar and update its width
    const healthBar = document.getElementById(`${team}${pokemon}Health`);
    healthBar.style.width = health + '%';
}
function decreaseHealth(pokemon, team, amount) {
    if (team === 'home') {
        homeTeam[pokemon] = Math.max(homeTeam[pokemon] - amount, 0);
        updateHealthBar(pokemon, 'home', homeTeam[pokemon]);
    } else {
        awayTeam[pokemon] = Math.max(awayTeam[pokemon] - amount, 0);
        updateHealthBar(pokemon, 'away', awayTeam[pokemon]);
    }
}
function initiate(){
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.add('inactive-dot')); // Make all dots inactive
	document.getElementById('dot5').classList.remove('inactive-dot'); // Center dot
}