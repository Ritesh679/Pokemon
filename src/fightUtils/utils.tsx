import { MOVE, POKEMON } from "../assets/interfaces";

export async function getPower(url: URL | string): Promise<number> {
	const result = await fetch(url);
	const parsedResult = await result.json();
	if (parsedResult.power) {
		return Number(parsedResult.power);
	} else {
		return 0;
	}
}

/** Get speed */
export const getSpeed = (pokemon: POKEMON[]) => {
	return pokemon && pokemon[0].stats[5].base_stat;
};

// get moves
export const moves = (pokemon: POKEMON[]) => {
	return pokemon && [...pokemon[0].moves.slice(0, 4)];
};
//Get HP

export const HP = (pokemon: POKEMON[]) => {
	return pokemon && Number(pokemon[0].stats[0].base_stat);
};
// Get Defence
export const defence = (pokemon: POKEMON[]) => {
	return pokemon && Number(pokemon[0].stats[2].base_stat);
};

/** Get random move and Power */

export const getRandomMove = (pokemon: MOVE[]) => {
	const random = pokemon[Math.floor(Math.random() * pokemon.length)];
	return random;
};
