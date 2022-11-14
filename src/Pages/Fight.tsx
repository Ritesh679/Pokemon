import { POKEMON } from "../assets/interfaces";

const Fight = ({
	firstPokemon,
	secondPokemon,
}: {
	firstPokemon: POKEMON;
	secondPokemon: POKEMON;
}) => {
	let defence1 = firstPokemon.stats[2].base_stat;
	const speed1 = firstPokemon.stats[5].base_stat;

	let defence2 = secondPokemon.stats[2].base_stat;
	const speed2 = secondPokemon.stats[5].base_stat;
};
export default Fight;
