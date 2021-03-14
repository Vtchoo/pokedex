import { useEffect, useState } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import { Pokemon } from './interfaces/Pokemon';

interface PokemonApiResponse{
	count: number
	next: string
	previous: string
	results: { name: string, url: string }[]
}


function App() {

	const [page, setPage] = useState(1)
	const [resultsPerPage, setResultsPerPage] = useState(50)

	const [pokemons, setPokemons] = useState<Pokemon[]>([])

	useEffect(() => { fetchPokemon() }, [])

	const fetchPokemon = async () => {

		const limit = resultsPerPage
		const offset = limit * (page - 1)


		try {
			const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
			const { results: pokemonList }: PokemonApiResponse = await result.json()

			const pokemonData = await Promise.all(pokemonList.map(async pokemon => {
				
				const rawData = await fetch(pokemon.url)
				const pokemonInfo = await rawData.json()

				return pokemonInfo
			}))
				
			console.log(pokemonData)
			setPokemons(pokemonData)
			setPage(page + 1)
			
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="App">
			{pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
		</div>
	)
}

export default App;
