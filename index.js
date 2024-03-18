const pokemonData = [];

async function getPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
    const data = await response.json();

    for (const pokemon of data.results) {
      const response = await fetch(pokemon.url);
      const pokemonInfo = await response.json();
      createPokemonCard(pokemonInfo);
    }
  } catch (error) {
    console.error('Ocorreu um erro ao obter os Pokémon:', error);
  }
}

function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.classList.add('pokemon');

  const name = document.createElement('h2');
  name.textContent = pokemon.name;

  const image = document.createElement('img');
  image.alt = 'Image Unavailable';
  image.src = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;

  const stats = document.createElement('ul');
  let totalStats = 0;

  for (const stat of pokemon.stats) {
    const statItem = document.createElement('li');
    statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    stats.append(statItem);

    totalStats += stat.base_stat;
  }

  const totalStatsItem = document.createElement('li');
  totalStatsItem.textContent = `Total Stats: ${totalStats}`;
  stats.append(totalStatsItem);


  const types = document.createElement('ul');
  for (const type of pokemon.types) {
    const typeItem = document.createElement('li');
    typeItem.textContent = type.type.name;
    types.append(typeItem);
  }

  card.append(name, image, stats, types);
  document.querySelector('#pokemon').append(card);
}

getPokemons();

const searchInput = document.querySelector('.pokemonSearch');

searchInput.addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon');

  pokemonCards.forEach(function(card) {
    const pokemonName = card.querySelector('h2').textContent.toLowerCase();

    if (pokemonName.includes(searchValue)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
});
