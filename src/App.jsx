import { useEffect, useState } from "react";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonsUrl, setPokemonsUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const getPokemons = async () => {
    const response = await fetch(pokemonsUrl);
    const data = await response.json();
    setPokemonsUrl(data.next);

    async function createPokemonObject(pokemons) {
      for (const pokemon of pokemons) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();
        setAllPokemons((prevState) => [...prevState, data]);
      }
    }

    createPokemonObject(data.results);
  };

  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const pickPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    console.log(pokemon);
  };

  const generateStat = () => {
    const min = Math.ceil(14);
    const max = Math.floor(100);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokedex</h1>

      <div className="blocks-container">

      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <div
              className={`thumb-container ${pokemon.types[0].type.name}`}
              key={index}
              onClick={() => pickPokemon(pokemon)}
            >
              <img src={pokemon.sprites.other.dream_world.front_default} />
              <div className="detail-wrapper">
                <h3>{capitalize(pokemon.name)}</h3>
                <div className="types-coniainer">
                  {pokemon.types.map((type, i) => (
                    <small className={`type ${type.type.name}`} key={i}>
                      {type.type.name}
                    </small>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => getPokemons()} className="load-more">
          Load more
        </button>
      </div>

      {selectedPokemon ? (
        <div className={`details-card-container ${selectedPokemon.types[0].type.name}`}>
          <img src={selectedPokemon.sprites.other.home.front_default} />
          <h3>
            #0{selectedPokemon.id} {capitalize(selectedPokemon.name)}
          </h3>
          <div className="details-card-table">
            <div>
              <div>Type</div>
              <div>{capitalize(selectedPokemon.types[0].type.name)}</div>
            </div>
            <div>
              <div>Attack</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>Defense</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>HP</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>SP Attack</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>SP Defense</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>Speed</div>
              <div>{generateStat()}</div>
            </div>
            <div>
              <div>Weight</div>
              <div>{selectedPokemon.weight}</div>
            </div>
            <div>
              <div>Total Moves</div>
              <div>{selectedPokemon.moves.length}</div>
            </div>
          </div>
        </div>
      ) : null}


      </div>

    </div>
  );
}

export default App;
