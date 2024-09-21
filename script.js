let currentPokemonId = 1;

const pokemonNameEl = document.getElementById('pokemon-name');
const pokemonImgEl = document.getElementById('pokemon-img');
const pokemonTypeEl = document.getElementById('pokemon-type');
const pokemonDisplayEl = document.getElementById('pokemon-display');
const inputPokemonIdEl = document.getElementById('pokemon-id');

async function buscarPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon não encontrado");
        const pokemon = await response.json();

        pokemonNameEl.textContent = pokemon.name;
        pokemonImgEl.src = pokemon.sprites.front_default;
        pokemonTypeEl.textContent = `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`;

        mudarFundoPorTipo(pokemon.types);

    } catch (error) {
        alert(error.message);
    }
}

function obterCorDoTipo(tipo) {
    let corFundo;
    switch (tipo) {
        case 'fire': return 'red';
        case 'water': return 'blue';
        case 'grass': return 'green';
        case 'electric': return 'yellow';
        case 'ice': return 'lightblue';
        case 'fighting': return 'brown';
        case 'psychic': return 'purple';
        case 'rock': return 'gray';
        case 'ground': return 'sandybrown';
        case 'poison': return 'violet';
        case 'flying': return 'skyblue';
        case 'bug': return 'limegreen';
        case 'ghost': return 'indigo';
        case 'dragon': return 'darkblue';
        case 'dark': return 'black';
        case 'steel': return 'silver';
        case 'fairy': return 'pink';
        default: return 'white';
    }
}

function mudarFundoPorTipo(tipos) {
    if (tipos.length === 1) {
        pokemonDisplayEl.style.backgroundImage = '';
        pokemonDisplayEl.style.backgroundColor = obterCorDoTipo(tipos[0].type.name);
    } else if (tipos.length === 2) {
        const cor1 = obterCorDoTipo(tipos[0].type.name);
        const cor2 = obterCorDoTipo(tipos[1].type.name);
        pokemonDisplayEl.style.backgroundImage = `linear-gradient(90deg, ${cor1} 50%, ${cor2} 50%)`;
    }
}

function mudarPokemon(direcao) {
    if (direcao === 'next') {
        currentPokemonId++;
    } else if (direcao === 'back' && currentPokemonId > 1) {
        currentPokemonId--;
    }
    buscarPokemon(currentPokemonId);
}

document.getElementById('btn-next').addEventListener('click', () => mudarPokemon('next'));

document.getElementById('btn-back').addEventListener('click', () => mudarPokemon('back'));

document.getElementById('btn-search').addEventListener('click', () => {
    const pokemonId = parseInt(inputPokemonIdEl.value);
    if (pokemonId > 0) {
        currentPokemonId = pokemonId;
        buscarPokemon(pokemonId);
    } else {
        alert("Por favor, insira um ID válido.");
    }
});

buscarPokemon(currentPokemonId);
