let rolling = false;
let buttonAbove = false;  // Track if the button is above or below
let homeSelection = [];
let awaySelection = [];

function selectPokemonForTeam(team, pokemon) {
    let teamSelection = team === 'home' ? homeSelection : awaySelection;
    
    if (teamSelection.length < 2) {
        teamSelection.push(pokemon);

        // Add the highlight to the selected Pokémon image
        document.querySelectorAll(`.${team}-pokemon`).forEach(img => {
            if (img.alt.toLowerCase().includes(pokemon)) {
                img.classList.add('selected');
            }
        });
    }
    
    // Enable the Start Battle button when both teams have selected 2 Pokémon
    if (homeSelection.length === 2 && awaySelection.length === 2) {
        document.getElementById('start-battle-btn').disabled = false;
    }
}

// After team selection, go to battle.html
function startBattle() {
    localStorage.setItem('homeTeam', JSON.stringify(homeSelection));
    localStorage.setItem('awayTeam', JSON.stringify(awaySelection));
    window.location.href = 'battle.html';  // Redirect to battle screen
}
// Function to switch the positions of two Pokémon
function switchPokemonPosition(team) {
    const firstPokemonImg = document.getElementById(`${team}Pokemon1`);
    const secondPokemonImg = document.getElementById(`${team}Pokemon2`);
    
    // Swap the image sources
    const tempSrc = firstPokemonImg.src;
    firstPokemonImg.src = secondPokemonImg.src;
    secondPokemonImg.src = tempSrc;
    
    // Swap the health bar values
    const firstHealthBar = document.getElementById(`${team}Pokemon1Health`);
    const secondHealthBar = document.getElementById(`${team}Pokemon2Health`);
    
    const tempHealthWidth = firstHealthBar.style.width;
    firstHealthBar.style.width = secondHealthBar.style.width;
    secondHealthBar.style.width = tempHealthWidth;
}
function loadSelectedTeams() {
    const homeTeamSelected = JSON.parse(localStorage.getItem('homeTeam'));
    const awayTeamSelected = JSON.parse(localStorage.getItem('awayTeam'));

    if (homeTeamSelected && awayTeamSelected) {
        // Load the images for home team
        selectPokemon('home', homeTeamSelected[0], 'homePokemon1');
        selectPokemon('home', homeTeamSelected[1], 'homePokemon2');

        // Load the images for away team
        selectPokemon('away', awayTeamSelected[0], 'awayPokemon1');
        selectPokemon('away', awayTeamSelected[1], 'awayPokemon2');
    }
}

// Ensure the Pokémon images are correctly loaded based on team
function selectPokemon(team, pokemon, imgElementId) {
    const pokemonImageUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif`;
    document.getElementById(imgElementId).src = pokemonImageUrl;
}

// Call loadSelectedTeams on page load to apply the chosen teams
document.addEventListener('DOMContentLoaded', function () {
    loadSelectedTeams();  // Load selected Pokémon into the battle screen
	addRestartButton();    // Add the restart button on the battle screen
});

// Add a restart button that goes back to team selection
function addRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.onclick = () => window.location.href = 'select-teams.html';
    document.body.appendChild(restartButton);
}


function rollDice() {
    if (rolling) return;  // Prevent multiple clicks during animation

    rolling = true;

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

        if (finalNumber > 3) {
            document.getElementById('attack-icon').style.display = 'block';  // Show attack icon
            
            // Determine which team is attacking and apply damage to the other team
            const attackingTeam = getAttackingTeam();  // Example logic for deciding which team attacks
            applyDamage(attackingTeam === 'home' ? 'away' : 'home');  // Apply damage to the opposing team
        }
		toggleButtonPosition();  // Change the button's position
        rolling = false;
    }, 1000);  // The rolling animation lasts for 1 seconds
}
function getAttackingTeam() {
	if (buttonAbove) {
		return 'away';
	} else {
		return 'home';
	}
}

// Function to apply damage to the opposing team's first Pokémon
function applyDamage(defendingTeam) {
    const firstPokemonHealth = document.getElementById(`${defendingTeam}Pokemon1Health`);
    let currentHealth = parseFloat(firstPokemonHealth.style.width) || 100;
    let newHealth = currentHealth -50;  // Reduce health by 50%

    if (newHealth <= 0) {
        firstPokemonHealth.style.width = '0%';  // Set health to 0
        // If Pokémon 1's health is 0, switch with Pokémon 2
        switchPokemonPosition(defendingTeam);

        // Check if both Pokémon's health is 0, and trigger winning animation if so
        const secondPokemonHealth = document.getElementById(`${defendingTeam}Pokemon1Health`).style.width;
        if (parseFloat(secondPokemonHealth) <= 0) {
            triggerWinningAnimation(defendingTeam === 'home' ? 'away' : 'home');  // The other team wins
        }
    } else {
        firstPokemonHealth.style.width = `${newHealth}%`;  // Update health bar width
    }
}
// Function to trigger winning animation
function triggerWinningAnimation(winningTeam) {    
    // Create fireworks container
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks-container');
    document.body.appendChild(fireworksContainer);

    // Add multiple firework elements
    for (let i = 0; i < 5; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        fireworksContainer.appendChild(firework);
    }

    // Play fireworks animation
    setTimeout(() => {
        fireworksContainer.remove();  // Remove the animation after 5 seconds
    }, 5000);
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