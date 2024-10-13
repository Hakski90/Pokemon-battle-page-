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
document.addEventListener('DOMContentLoaded', function () {
    // Set default Pokémon (Squirtle and Charmander for both teams)
    selectPokemon('home', 'squirtle', 'homeSquirtleImg');
    selectPokemon('home', 'charmander', 'homeCharmanderImg');
    selectPokemon('away', 'squirtle', 'awaySquirtleImg');
    selectPokemon('away', 'charmander', 'awayCharmanderImg');
});
function rollDice() {
    if (rolling) return;  // Prevent multiple clicks during animation

    rolling = true;
    toggleButtonPosition();  // Change the button's position

    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('inactive-dot')); // Reset all dots to active
    // Hide attack icon initially
    document.getElementById('attack-icon').style.display = 'none';

    // Rolling animation (show random dice face quickly)
    var rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        showDiceFace(random);  // Show a random dice face during the roll
    }, 100);  // Change dice face every 100ms to simulate rolling

    // Final result after animation
    setTimeout(() => {
        clearInterval(rollInterval);  // Stop the rapid rolling animation
        let finalNumber = Math.floor(Math.random() * 6) + 1;  // Final dice number
        showDiceFace(finalNumber);    // Show the final rolled number

        // Show attack icon only if the final number is 4, 5, or 6
        if (finalNumber > 3) {
            document.getElementById('attack-icon').style.display = 'block';
        }

        rolling = false;
    }, 1000);  // The rolling animation lasts for 1 seconds
}
// Function to select a Pokémon for the team
function selectPokemon(team, pokemon, imgElementId) {
    const pokemonImageUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif`;
    document.getElementById(imgElementId).src = pokemonImageUrl;
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