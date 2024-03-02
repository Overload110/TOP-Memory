import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [score, setScore] = useState(0);
  const pkmnList = ['bulbasaur', 'cyndaquil', 'torchic', 'turtwig', 'snivy', 'froakie', 'rowlet', 'grookey', 'quaxly']
  const [monList, setMonList] = useState([]);


   // Function to fetch a single Pokemon
   const fetchSinglePokemon = (url) => {
    axios
      .get(url)
      .then((response) => {
        // Check if the id already exists in the monList
        let idx = monList.findIndex((mon) => mon.id === response.data.id);

        // Only add the pokemon to the list if it doesn't exist
        if (idx === -1) {
          setMonList((prevList) => [...prevList, response.data]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    pkmnList.forEach(pkmn => fetchSinglePokemon(`https://pokeapi.co/api/v2/pokemon/${pkmn}`))
}, []);

  return (
    <>
      {monList.map(mon =>(
        <h1 key={mon.id}>{mon.name}</h1>
      ))}
    </>
  )
}

export default App
