import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import _ from 'lodash';
import { Card, CardContent, CardFooter } from "./components/ui/card";


function App() {
  const [score, setScore] = useState(0);
  const pkmnList = ['bulbasaur', 'cyndaquil', 'torchic', 'turtwig', 'snivy', 'froakie', 'rowlet', 'grookey', 'quaxly']
  const [monList, setMonList] = useState([]);


  // Function to fetch a single Pokemon
  //  const fetchSinglePokemon = (url) => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       // Check if the id already exists in the monList
  //       let idx = monList.findIndex((mon) => mon.id == response.data.id);
  //       // Only add the pokemon to the list if it doesn't exist
  //       if (idx === -1) {
  //         setMonList((prevList) => [...prevList, response.data]);
          
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  useEffect(() => {
  Promise.all(
    pkmnList.map(pkmn => axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmn}`))
  )
  .then(responses => responses.map(res => res.data))
  .then(setMonList)
  .catch(console.error);
}, []);

  return (
    <div className='grid grid-cols-3 grid-rows-3 '>
      {_.shuffle(monList).map(mon =>(
        <Card key={mon.id}>
        <CardContent>
            <img src={mon.sprites.front_default} alt={mon.name} />
        </CardContent>
        <CardFooter>
            <h1 style={{textTransform: 'capitalize'}}>{mon.name}</h1>
        </CardFooter>
    </Card>
      ))}
    </div>
  )
}

export default App
