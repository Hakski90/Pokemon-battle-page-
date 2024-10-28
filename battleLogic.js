let rolling = false;
let awayTeamAttacking = false;
let isDefending = false;  // Flag to track if we're in defense mode
// Import the configuration file
//const config = window.gameConfig;

function rollDice() {
    if (rolling) return;  // Prevent multiple clicks
    rolling = true;

    // Reset dice dots and attack icon visibility
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('inactive-dot'));
    document.getElementById('attack-icon').style.display = 'none';

    // Dice roll animation
    var rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        showDiceFace(random);
    }, 100);

    // Final dice outcome
    setTimeout(() => {
        clearInterval(rollInterval);
        let finalNumber = Math.floor(Math.random() * 6) + 1;
        showDiceFace(finalNumber);

        if (isDefending) {
            handleDefenseOutcome(finalNumber);  // Defense roll outcome
        } else {
            handleAttackOutcome(finalNumber);   // Attack roll outcome
        }
		handleEvolveButtonVisibility(getAttackingTeam());
        rolling = false;  // Re-enable button after roll completes
    }, 1000);
}

function handleAttackOutcome(finalNumber) {
    if (finalNumber > gameConfig.attackThreshold) {
        // If attack is successful (4, 5, 6), enable defense mode
		// Display attack icon for 3 seconds before defense roll
        showAttackIcon();
        setTimeout(() => hideAttackIcon(), 1000);
		isDefending = true;
        toggleDefenseRollButton(true);  // Switch button for defense
    } else {
        // If attack fails, switch turns without damage
        switchTurn();
        toggleButtonPosition(awayTeamAttacking);
    }
}

function defendRoll() {
    if (rolling) return;
    rolling = true;

    // Dice roll animation for defense
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('inactive-dot'));

    var rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        showDiceFace(random);
    }, 100);

    // Final defense roll outcome
    setTimeout(() => {
        clearInterval(rollInterval);
        let finalNumber = Math.floor(Math.random() * 6) + 1;
        showDiceFace(finalNumber);

        handleDefenseOutcome(finalNumber);  // Process defense roll result
        rolling = false;
    }, 1000);
}
// Updated defense outcome using the configuration threshold
function handleDefenseOutcome(finalNumber) {
    toggleDefenseRollButton(false);  // Reset roll button after defense roll
    const defendingTeam = awayTeamAttacking ? 'home' : 'away';

    if (finalNumber > gameConfig.dodgeThreshold) {
		// Successful dodge, show smiley icon
        showTemporaryIcon('smiley-icon');
        switchTurn(); // Pass turn to the defender
    } else {
        // Failed dodge, show sad face and apply damage
        showTemporaryIcon('sad-icon');
        applyDamage(defendingTeam);
        switchTurn();  // Pass turn to the defender after damage
    }
    isDefending = false;
}

function switchTurn() {
    awayTeamAttacking = !awayTeamAttacking;  // Toggle team turn
}

function toggleDefenseRollButton(isDefense) {
    const rollButton = document.getElementById('roll-btn');

    if (isDefense) {
        // Customize button for defense roll (jump away attempt)
        toggleButtonPosition(!awayTeamAttacking);  // Set button position opposite of the attacking team
        rollButton.style.backgroundColor = 'blue';
        rollButton.innerHTML = `<img src="jump-icon.jpg" alt="Jump Icon" style="width: 20px; vertical-align: middle;"> Roll to Jump!`;
        rollButton.onclick = defendRoll;
    } else {
        // Reset button for normal attack roll
        rollButton.style.backgroundColor = '';  // Reset color
        rollButton.innerHTML = 'Roll Dice';
        rollButton.onclick = rollDice;
    }
}
function showAttackIcon() {
    const attackIcon = document.getElementById('attack-icon');
    attackIcon.innerHTML = '⚔️';  // Optional: add icon text for clarity
    attackIcon.style.display = 'block';
}

function hideAttackIcon() {
    const attackIcon = document.getElementById('attack-icon');
    attackIcon.style.display = 'none';
    attackIcon.innerHTML = '';  // Clear content
}
function showTemporaryIcon(iconType) {
    const attackIcon = document.getElementById('attack-icon');
    attackIcon.style.display = 'block';

    if (iconType === 'smiley-icon') {
        attackIcon.innerHTML = '😊';
    } else if (iconType === 'sad-icon') {
        attackIcon.innerHTML = '😞';
    }

    setTimeout(() => hideAttackIcon(), 3000);
}

function getAttackingTeam() {
    return awayTeamAttacking ? 'away' : 'home';
}

function switchPokemonPosition(team) {
    const firstPokemonImg = document.getElementById(`${team}Pokemon1`);
    const secondPokemonImg = document.getElementById(`${team}Pokemon2`);

    // Swap images and health bars between Pokemon1 and Pokemon2
    const tempSrc = firstPokemonImg.src;
    firstPokemonImg.src = secondPokemonImg.src;
    secondPokemonImg.src = tempSrc;

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
        switchPokemonPosition(defendingTeam);  // Swap positions if first Pokemon is out

        const secondPokemonHealth = document.getElementById(`${defendingTeam}Pokemon1Health`).style.width;
        if (parseFloat(secondPokemonHealth) <= 0) {
            triggerWinningAnimation(defendingTeam === 'home' ? 'away' : 'home');  // Declare winning team
        }
    } else {
        firstPokemonHealth.style.width = `${newHealth}%`;  // Update health bar
    }
}

function toggleButtonPosition(buttonWithAwayTeam) {
    const diceContainer = document.getElementById('dice-container');
    const button = document.getElementById('roll-btn');

    if (buttonWithAwayTeam) {
        diceContainer.insertBefore(button, diceContainer.firstChild);  // Move button above dice
    } else {
        diceContainer.appendChild(button);  // Move button below dice
    }
}

function updateHealthBar(pokemon, team, health) {
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

function initiate() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.add('inactive-dot'));  // Set all dots inactive initially
    document.getElementById('dot5').classList.remove('inactive-dot');  // Show center dot for start
}
