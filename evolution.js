async function getEvolution(currentPokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`);
    const data = await response.json();
    const evolutionChainUrl = data.evolution_chain.url;

    const evolutionResponse = await fetch(evolutionChainUrl);
    const evolutionData = await evolutionResponse.json();

    let chain = evolutionData.chain;
    while (chain.species.name !== currentPokemon) {
        if (chain.evolves_to.length === 0) {
            return null;
        }
        chain = chain.evolves_to[0];
    }

    if (chain.evolves_to.length > 0) {
        return chain.evolves_to[0].species.name;
    } else {
        return null;
    }
}

async function evolvePokemon(pokemonId) {
    const pokemonImg = document.getElementById(pokemonId);
    const currentPokemon = pokemonImg.src.split('/').pop().split('.')[0];
    const nextEvolution = await getEvolution(currentPokemon);

    if (nextEvolution) {
        pokemonImg.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${nextEvolution}.gif`;
    } else {
        alert(`${currentPokemon} cannot evolve further!`);
    }
}

function handleEvolveButtonVisibility(attackingTeam) {
    const showEvolveButton = Math.random() < 0.5;

    document.querySelectorAll('.evolve-btn').forEach(btn => btn.style.display = 'none');

    if (showEvolveButton) {
        const evolveBtnId = `${attackingTeam}Pokemon1Evolve`;  // Always show for Pokemon1
        document.getElementById(evolveBtnId).style.display = 'block';
    }
}