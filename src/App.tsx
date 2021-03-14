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

	const [loading, setLoading] = useState(false)

	const [resultsPerPage, setResultsPerPage] = useState(48)
	const [offset, setOffset] = useState(0)

	const [pokemons, setPokemons] = useState<Pokemon[]>([])

	useEffect(() => { fetchPokemon() }, [])

	const fetchPokemon = async () => {

		setLoading(true)

		const limit = resultsPerPage
		//const offset = limit * (page - 1)

		try {
			const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
			const { results: pokemonList }: PokemonApiResponse = await result.json()

			const pokemonData = await Promise.all(pokemonList.map(async pokemon => {
				
				try {
					const rawData = await fetch(pokemon.url)
					// console.log(rawData)
					const pokemonInfo = await rawData.json()
					
					return pokemonInfo
				} catch (error) {
					console.log(error)
					return null
				}
			}))
				
			const newPokemons = pokemonData.filter(pokemon => pokemon !== null)
			console.log(newPokemons)

			setPokemons([...pokemons, ...newPokemons])
			setOffset(offset + newPokemons.length)
			
		} catch (error) {
			console.log(error)
		}
		
		setLoading(false)
	}

	return (
		<div className="App">
			<div className="pokemon-list">
				{pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
			</div>

			<button disabled={loading} className='load-more' onClick={fetchPokemon}>
				{loading ? 'Loading' : 'Load more...'}
			</button>
		</div>
	)
}

export default App;
