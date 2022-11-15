import React from "react";
import { POKEMON } from "../assets/interfaces";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Sidebar from "../Components/Sidebar";
import FighterSelect from "../fightUtils/fighterSelect";

const MainPage = ({
	handleSearch,
	allPokemons,
	checkboxHandler,
	pokemonData,
	pagination,
	offset,
}: {
	handleSearch: Function;
	allPokemons: POKEMON[];
	checkboxHandler: Function;
	pokemonData: POKEMON[];
	pagination: Function;
	offset: number;
}) => {
	return (
		<div>
			<div className="flex flex-row">
				<Sidebar
					handleSearch={handleSearch}
					allPokemons={allPokemons}
					checkboxHandler={checkboxHandler}
				/>
				<div className="grid grid-cols-2 md:grid-cols-3">
					{pokemonData.slice(0, 30).map((pokemon: any) => (
						<Card pokemon={pokemon} key={pokemon.id} />
					))}
				</div>
			</div>
			<Pagination pagination={pagination} offset={offset}></Pagination>
		</div>
	);
};

export default MainPage;
