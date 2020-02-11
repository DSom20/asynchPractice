async function getAllPokemon() {
  let response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1000");
  let pokemonList = response.data.results.map(p => p);
  return pokemonList;
}

async function getThree(totalNumPokemon) {
  let pokeId1 = Math.round(Math.random() * (totalNumPokemon));
  let pokeId2 = Math.round(Math.random() * (totalNumPokemon));
  let pokeId3 = Math.round(Math.random() * (totalNumPokemon));

  let promise1 = getPokemonData(pokeId1);
  let promise2 = getPokemonData(pokeId2);
  let promise3 = getPokemonData(pokeId3);

  let responseList = await Promise.all([promise1, promise2, promise3]);

  return responseList.map(r => r.data);
}

function getPokemonData(idx) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${idx}`)
}

async function printFlavorText() {
  let pokemonDataList = await getThree(800);
  let responseArr = await Promise.all(pokemonDataList.map(d => axios.get(d.species.url)))
  let flavorArr = responseArr.map(r => r.data.flavor_text_entries);
  for(ind in flavorArr) {
    let pokemonName = responseArr[ind].data.name;
    for(f of flavorArr[ind]) {
      if (f.language.name === "en") {
        console.log(`${pokemonName}: ${f.flavor_text}`)
        break;
      }
    }
  }
}

async function getSpeciesFlavorText(pokemonData) {
  let response = await axios.get(pokemonData.species.url);
  let flavor_text_entries = response.data.flavor_text_entries;
  if (flavor_text) {
    console.log("name + flavor_text")
  }
}