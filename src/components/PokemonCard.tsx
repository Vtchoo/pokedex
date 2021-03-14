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
            className={`${styles.pokemonCard} ${styles[type.name]} ${props.selected ? styles.selected : ''}`}
            onClick={() => props.onClick?.(pokemon)}
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

export default PokemonCard