let rolling = false;
let buttonAbove = false;  // Track if the button is above or below
let homeSelection = [];
let awaySelection = [];

function selectPokemonForTeam(team, pokemon) {
    if (team === 'home' && homeSelection.length < 2) {
        homeSelection.push(pokemon);
    } else if (team === 'away' && awaySelection.length < 2) {
        awaySelection.push(pokemon);
    }

    // Once both teams have selected 2 Pokémon, enable the Start Battle button
    if (homeSelection.length === 2 && awaySelection.length === 2) {
        document.getElementById('start-battle-btn').disabled = false;
    }
}

// Start battle function to switch to the battle screen with selected Pokémon
function startBattle() {
    localStorage.setItem('homeTeam', JSON.stringify(homeSelection));
    localStorage.setItem('awayTeam', JSON.stringify(awaySelection));
    window.location.href = 'index.html';  // Redirect to the battle page
}

function loadSelectedTeams() {
    const homeTeamSelected = JSON.parse(localStorage.getItem('homeTeam'));
    const awayTeamSelected = JSON.parse(localStorage.getItem('awayTeam'));

    if (homeTeamSelected && awayTeamSelected) {
        // Set selected Pokémon images
        selectPokemon('home', homeTeamSelected[0], 'homeSquirtleImg');
        selectPokemon('home', homeTeamSelected[1], 'homeCharmanderImg');
        selectPokemon('away', awayTeamSelected[0], 'awaySquirtleImg');
        selectPokemon('away', awayTeamSelected[1], 'awayCharmanderImg');
    }
}

// Add a restart button that goes back to team selection
function addRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.onclick = () => window.location.href = 'select-teams.html';
    document.body.appendChild(restartButton);
}

// Call loadSelectedTeams() on page load to apply the chosen teams
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('index.html')) {
        loadSelectedTeams();  // Load selected Pokémon into the battle screen
        addRestartButton();    // Add the restart button on the battle screen
    }
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