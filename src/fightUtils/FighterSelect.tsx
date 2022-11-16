import React, { useEffect, useState } from "react";
import { POKEMON } from "../assets/interfaces";
import Fight from "../Pages/Fight";

const FighterSelect = ({ pokemonData }: { pokemonData: POKEMON[] }) => {
	const [firstPokemon, setFirstPokemon] = useState<POKEMON[]>();
	const [secondPokemon, setSecondPokemon] = useState<POKEMON[]>();
	const [pokemon, setPokemon] = useState<POKEMON[]>([]);
	async function fetchData() {
		await fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=1154")
			.then((res) => res.json())
			.then((data) => setPokemon(data.results));
	}
	const handleFirstPokemon = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let poke = pokemonData.filter((data) => data.name === event.target.value);
		setFirstPokemon(poke);
	};
	const handleSecondPokemon = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let poke = pokemonData.filter((data) => data.name === event.target.value);
		setSecondPokemon(poke);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="h-[100vh] bg-gray-600 rounded-xl">
			<div className="flex justify-evenly pt-[100px]">
				{/**Selecting First Pokemon for fight**/}
				<select
					className="p-3 rounded-lg"
					onChange={(event) => handleFirstPokemon(event)}
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
			{(!firstPokemon || !secondPokemon) && (
				<h1>Please select both pokemons</h1>
			)}
			{firstPokemon && secondPokemon && (
				<Fight firstPokemon={firstPokemon} secondPokemon={secondPokemon} />
			)}
		</div>
	);
};

export default FighterSelect;
