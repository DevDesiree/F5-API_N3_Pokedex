const poke_container = document.getElementById('poke-container');
const loader = document.getElementById("loader")
const pokemon_count = 150;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

async function getData(id) {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  let response = await data.json();

  let namePoke = response.name;
  let imagePoke = response.sprites.other['official-artwork'].front_default;
  let idPokemon = response.id;
  let typePokemon = response.types[0].type.name;

  return { namePoke, imagePoke, idPokemon, typePokemon };
}

function getBackground(type) {
  return type in colors ? colors[type] : 'La clave no existe';
}

function createPokemon(namePoke, imagePoke, idPokemon, typePokemon) {
  let background = getBackground(typePokemon);
  let formattedNumber = String(idPokemon).padStart(3, '0');

  const contentCard = `
    <div class="pokemon" style="background-color: ${background};">
      <div class="img-container">
        <img src="${imagePoke}" alt="${namePoke}">
      </div>
      <div class="info">
        <span class="number">${formattedNumber}</span>
        <h3 class="name">${namePoke}</h3>
        <small class="type">Type: <span>${typePokemon}</span></small>
      </div>
    </div>
  `;

  poke_container.innerHTML += contentCard;
}

async function fetchAndCreatePokemon() {
  const promises = [];
  for (let i = 1; i <= pokemon_count; i++) {
    promises.push(getData(i));
  }

  const pokemonDataArray = await Promise.all(promises);

  pokemonDataArray.sort((a, b) => a.idPokemon - b.idPokemon);

  pokemonDataArray.forEach(({ namePoke, imagePoke, idPokemon, typePokemon }) => {
    createPokemon(namePoke, imagePoke, idPokemon, typePokemon);
  });
  loader.style.display = "none"
}

fetchAndCreatePokemon();
