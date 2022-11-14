import React, { useState } from "react";
import { POKEMON } from "../assets/interfaces";
import FightCard from "../fightUtils/fightCard";
import {
	getPower,
	getRandomMove,
	getSpeed,
	HP,
	moves,
} from "../fightUtils/utils";

const FightSection = ({ pokemonData }: { pokemonData: POKEMON[] }) => {
	/*** Initializing all required Datas */
	const [firstPokemon, setFirstPokemon] = useState<POKEMON[]>();
	const [secondPokemon, setSecondPokemon] = useState<POKEMON[]>();
	const [gameOver, setGameOver] = useState(false);

	let defence1 = firstPokemon && firstPokemon[0].stats[2].base_stat;
	let defence2 = secondPokemon && secondPokemon[0].stats[2].base_stat;

	const handleFirstPokemon = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setMessage([]);
		setFirstPokemon(
			pokemonData.filter((data) => data.name === event.target.value)
		);
	};

	const handleSecondPokemon = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setMessage([]);
		setSecondPokemon(
			pokemonData.filter((data) => data.name === event.target.value)
		);
	};

	const handleRematch = () => {
		console.log("rematch");
	};

	function undoMove() {
		console.log("undo");
	}
	let firstPokemonHP = firstPokemon && HP(firstPokemon);
	let secondPokemonHP = secondPokemon && HP(secondPokemon);
	const firstPokemonSpeed = firstPokemon ? getSpeed(firstPokemon) : 0;
	const secondPokemonSpeed = secondPokemon ? getSpeed(secondPokemon) : 0;
	let pokemon1HP = firstPokemon && firstPokemon[0].stats[0].base_stat;
	let pokemon2HP = secondPokemon && secondPokemon[0].stats[0].base_stat;
	const [message, setMessage] = useState([""]);

	async function handleFight() {
		setMessage([]);
		try {
			let tempDefence1 = defence1;
			let tempDefence2 = defence2;
			let attacker =
				firstPokemonSpeed > secondPokemonSpeed ? firstPokemon : secondPokemon;

			while (
				firstPokemon &&
				secondPokemon &&
				pokemon2HP &&
				tempDefence1 &&
				defence2 &&
				tempDefence2 &&
				pokemon1HP &&
				defence1 &&
				pokemon1HP > 0 &&
				pokemon2HP > 0
			) {
				if (attacker === firstPokemon) {
					const randomMove1 =
						firstPokemon && getRandomMove(moves(firstPokemon));
					const currentPower1 =
						randomMove1 && (await getPower(randomMove1.move.url));
					setMessage((mess) => [
						...mess,
						`${firstPokemon[0].name} attacked and dealt a damage of ${currentPower1}`,
					]);
					pokemon2HP =
						tempDefence2 < 0
							? pokemon2HP - currentPower1
							: tempDefence2 - currentPower1 < 0
							? pokemon2HP - Math.abs(tempDefence2 - currentPower1)
							: pokemon2HP;
					tempDefence2 = tempDefence2 - currentPower1;
					setMessage((mess) => [
						...mess,
						`${secondPokemon[0].name}'s defence is ${
							tempDefence2 && tempDefence2 < 0 ? 0 : tempDefence2
						}`,
					]);
					setMessage((mess) => [
						...mess,
						`${secondPokemon[0].name} HP is now ${
							pokemon2HP && pokemon2HP < 0 ? 0 : pokemon2HP
						} `,
					]);
					if (pokemon2HP <= 0) {
						setMessage((mess) => [...mess, `${firstPokemon[0].name} won`]);
						break;
					}
					attacker = secondPokemon;
				}
				if (attacker === secondPokemon) {
					const randomMove2 =
						secondPokemon && getRandomMove(moves(secondPokemon));
					const currentPower2 =
						randomMove2 && (await getPower(randomMove2.move.url));
					pokemon1HP =
						tempDefence2 < 0
							? pokemon1HP - currentPower2
							: tempDefence1 - currentPower2 < 0
							? pokemon1HP - Math.abs(tempDefence1 - currentPower2)
							: pokemon1HP;
					tempDefence1 = tempDefence1 - currentPower2;
					secondPokemon &&
						setMessage((mess) => [
							...mess,
							`${secondPokemon[0].name} attacked and dealt a damage of ${currentPower2}`,
						]);
					setMessage((mess) => [
						...mess,
						`${firstPokemon[0].name}'s defence is ${
							tempDefence1 && tempDefence1 < 0 ? 0 : tempDefence1
						}`,
					]);
					setMessage((mess) => [
						...mess,
						`${firstPokemon[0].name} HP is now ${
							pokemon1HP && pokemon1HP < 0 ? 0 : pokemon1HP
						} `,
					]);
					if (pokemon1HP <= 0) {
						setMessage((mess) => [...mess, `${secondPokemon[0].name} won`]);
						break;
					}
					attacker = firstPokemon;
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	console.log(message);
	return (
		<div className="py-[50px] min-h-[100vh]">
			{/** Selecting Pokemons */}
			<div className="flex justify-evenly">
				{/**Selecting First Pokemon for fight**/}
				<select
					className="p-3 rounded-lg"
					onChange={(event) => handleFirstPokemon(event)}
				>
					<option disabled selected>
						Select a Pokemon
					</option>
					{pokemonData.map((data, i) => {
						return (
							<option key={i} value={data.name}>
								{data.name}
							</option>
						);
					})}
				</select>
				{/**Selecting second Pokemon for fight */}
				{
					<select
						className="p-3 rounded-lg"
						onChange={(event) => handleSecondPokemon(event)}
					>
						<option disabled selected>
							Select a Pokemon
						</option>
						{pokemonData &&
							pokemonData.map((data, i) => {
								return (
									<option key={i} value={data.name}>
										{data.name}
									</option>
								);
							})}
					</select>
				}
			</div>
			{/** Creating Cards */}
			<div className="flex mt-[100px] justify-evenly">
				{firstPokemon && firstPokemonHP && (
					<FightCard pokemon={firstPokemon[0]} HP={firstPokemonHP} />
				)}
				{secondPokemon && secondPokemonHP && (
					<FightCard pokemon={secondPokemon[0]} HP={secondPokemonHP} />
				)}
			</div>

			{/** Fight Button */}
			{firstPokemon && secondPokemon && (
				<div>
					{!gameOver ? (
						<button
							className="p-4 border-solid border-1 border-white"
							onClick={handleFight}
						>
							Fight
						</button>
					) : (
						<button
							className="p-4 border-solid border-1 border-white"
							onClick={handleRematch}
						>
							Rematch
						</button>
					)}
					<button
						className="p-4 border-solid border-1 border-white"
						onClick={undoMove}
					>
						Undo
					</button>
				</div>
			)}

			{message.length > 0 &&
				message.map((m, i) => (
					<li className="text-white list-none" key={i}>
						<button className="p-3">{m}</button>
					</li>
				))}
		</div>
	);
};

export default FightSection;
