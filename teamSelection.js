let homeSelection = [];
let awaySelection = [];

function selectPokemonForTeam(team, pokemon) {
    let teamSelection = team === 'home' ? homeSelection : awaySelection;

    // If the team has already selected 2 Pokémon, replace the oldest one
    if (teamSelection.length >= 2) {
        const removedPokemon = teamSelection.shift();
        document.querySelectorAll(`.${team}-pokemon`).forEach(img => {
            if (img.alt.toLowerCase().includes(removedPokemon)) {
                img.classList.remove('selected');
            }
        });
    }

    teamSelection.push(pokemon);

    document.querySelectorAll(`.${team}-pokemon`).forEach(img => {
        if (img.alt.toLowerCase().includes(pokemon)) {
            img.classList.add('selected');
        }
    });

    // Enable the Start Battle button when both teams have selected 2 Pokémon
    if (homeSelection.length === 2 && awaySelection.length === 2) {
        document.getElementById('start-battle-btn').disabled = false;
    }
}

function startBattle() {
    localStorage.setItem('homeTeam', JSON.stringify(homeSelection));
    localStorage.setItem('awayTeam', JSON.stringify(awaySelection));
    window.location.href = 'battle.html';  // Redirect to battle screen
}
function selectPokemon(team, pokemon, imgElementId) {
    const pokemonImageUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif`;
    document.getElementById(imgElementId).src = pokemonImageUrl;
}
function loadSelectedTeams() {
    const homeTeamSelected = JSON.parse(localStorage.getItem('homeTeam'));
    const awayTeamSelected = JSON.parse(localStorage.getItem('awayTeam'));

    if (homeTeamSelected && awayTeamSelected) {
        selectPokemon('home', homeTeamSelected[0], 'homePokemon1');
        selectPokemon('home', homeTeamSelected[1], 'homePokemon2');
        selectPokemon('away', awayTeamSelected[0], 'awayPokemon1');
        selectPokemon('away', awayTeamSelected[1], 'awayPokemon2');
    }
}
