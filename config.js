// config.js

// Load configuration from localStorage, or fall back on default values
const savedConfig = JSON.parse(localStorage.getItem("gameConfig"));

window.gameConfig = {
    attackThreshold: savedConfig?.attackThreshold ?? 4,  // Use saved value or default
    dodgeThreshold: savedConfig?.dodgeThreshold ?? 4,    // Use saved value or default
	evolutionProbability: savedConfig?.evolutionProbability ?? 0.5,  // Default to 50% probability
    pokemonChoices: savedConfig?.pokemonChoices ?? [
        'charmander', 'squirtle', 'pikachu', 'bulbasaur'
    ]
};


