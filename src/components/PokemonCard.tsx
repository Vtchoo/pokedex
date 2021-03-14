import { Pokemon } from "../interfaces/Pokemon"

interface PokemonCardProps {
    pokemon: Pokemon
}

function PokemonCard(props: PokemonCardProps) {

    return (
        <div>
            {props.pokemon.name}
        </div>
    )
}

export default PokemonCard