import { Pokemon } from "../interfaces/Pokemon"
import StringUtils from "../utils/StringUtils"
import styles from './PokemonCard.module.css'

interface PokemonCardProps {
    pokemon: Pokemon
    onClick?: (pokemon: Pokemon) => void
    selected?: boolean
}

function PokemonCard(props: PokemonCardProps) {

    const { pokemon } = props

    const { type } = pokemon.types[0]

    const getPokemonImage = (id: number) => `https://pokeres.bastionbot.org/images/pokemon/${id}.png?width=30&height=30`

    return (
        <div
            className={`${styles.pokemonCard} ${props.selected ? styles.selected : ''}`}
            onClick={() => props.onClick?.(pokemon)}
            style={{ backgroundColor: colors[type.name]}}
        >
            <div className={`${styles.spriteContainer}`}>
                {/* <img src={pokemon.sprites.front_default}></img> */}
                <img src={getPokemonImage(pokemon.id)} alt=""/>
            </div>
            
            <small className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</small>
            <strong>{StringUtils.capitalize(pokemon.name)}</strong>
            <small>Type: {type.name}</small>
        </div>
    )
}

const colors: { [color: string]: string } = {
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
	normal: '#F5F5F5'
};

export default PokemonCard