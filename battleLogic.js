let rolling = false;
let awayTeamActive = false;

function rollDice() {
    if (rolling) return;
    rolling = true;

    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('inactive-dot'));
    document.getElementById('attack-icon').style.display = 'none';

    var rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        showDiceFace(random);
    }, 100);

    setTimeout(() => {
        clearInterval(rollInterval);
        let finalNumber = Math.floor(Math.random() * 6) + 1;
        showDiceFace(finalNumber);

        if (finalNumber > 3) {
            const attackIcon = document.getElementById('attack-icon');
            attackIcon.style.display = 'block';
            setTimeout(() => attackIcon.style.display = 'none', 3000);
            const attackingTeam = getAttackingTeam();
            applyDamage(attackingTeam === 'home' ? 'away' : 'home');
        }

        toggleButtonPosition();
        handleEvolveButtonVisibility(getAttackingTeam());
        rolling = false;
    }, 1000);
}

function getAttackingTeam() {
    return awayTeamActive ? 'away' : 'home';
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
function applyDamage(defendingTeam) {
    const firstPokemonHealth = document.getElementById(`${defendingTeam}Pokemon1Health`);
    let currentHealth = parseFloat(firstPokemonHealth.style.width) || 100;
    let newHealth = currentHealth - 50;

    if (newHealth <= 0) {
        firstPokemonHealth.style.width = '0%';
        switchPokemonPosition(defendingTeam);

        const secondPokemonHealth = document.getElementById(`${defendingTeam}Pokemon1Health`).style.width;
        if (parseFloat(secondPokemonHealth) <= 0) {
            triggerWinningAnimation(defendingTeam === 'home' ? 'away' : 'home');
        }
    } else {
        firstPokemonHealth.style.width = `${newHealth}%`;
    }
}

function toggleButtonPosition() {
    const diceContainer = document.getElementById('dice-container');
    const button = document.getElementById('roll-btn');

    if (awayTeamActive) {
        diceContainer.appendChild(button);
    } else {
        diceContainer.insertBefore(button, diceContainer.firstChild);
    }
    awayTeamActive = !awayTeamActive;
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