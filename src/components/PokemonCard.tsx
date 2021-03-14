import { Pokemon } from "../interfaces/Pokemon"
import StringUtils from "../utils/StringUtils"
import styles from './PokemonCard.module.css'

interface PokemonCardProps {
    pokemon: Pokemon
}

function PokemonCard(props: PokemonCardProps) {

    const { pokemon } = props

    const { type } = pokemon.types[0]

    return (
        <div className={`${styles.pokemonCard} ${styles[type.name]}`}>
            <div className={`${styles.spriteContainer}`}>
                <img src={pokemon.sprites.front_default}></img>
            </div>
            <span className={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</span>
            <strong>{StringUtils.capitalize(pokemon.name)}</strong>
            <small>Type: {type.name}</small>
        </div>
    )
}

export default PokemonCard