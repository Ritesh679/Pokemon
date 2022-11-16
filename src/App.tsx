import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import { POKEMON } from "./assets/interfaces";
import FighterSelect from "./fightUtils/FighterSelect";

function App() {
	const [offset, setOffset] = useState(0);
	const [pokemonData, setPokemonData] = useState<POKEMON[]>([]);
	const [allPokemons, setAllPokemons] = useState<POKEMON[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [checkboxTypes, setCheckboxTypes] = useState<string[]>([]);
	const [limit, setLimit] = useState(20);

	const fetchData = async (offset: number, limit: number) => {
		let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
		let res: any = await getPokemons(url);
		await fetchPokemon(res.results);
	};

	async function getPokemons(url: any) {
		return new Promise((resolve) => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => resolve(data));
		});
	}

	async function getPokemon(url: { name: String; url: URL }) {
		return new Promise((resolve) => {
			fetch(url.url)
				.then((res) => res.json())
				.then((data) => {
					resolve(data);
				});
		});
	}

	const fetchPokemon = async (data: any) => {
		let currentPokemon = await Promise.all(
			data.map(async (pokemon: any) => {
				let pokemonDetails = await getPokemon(pokemon);
				return pokemonDetails;
			})
		);
		setPokemonData(currentPokemon);
		setAllPokemons(currentPokemon);
	};
	const pagination = (value: string) => {
		value === "next" ? setOffset(offset + 20) : setOffset(offset - 20);
	};
	function handleSearch(value: any) {
		// setLimit(1148);
		setSearchValue(value);
	}
	function checkboxHandler(name: string, checked: Boolean) {
		checked && setCheckboxTypes([...checkboxTypes, name]);
		!checked &&
			setCheckboxTypes(checkboxTypes.filter((types) => types !== name));
	}
	useEffect(() => {
		let filteredData = [];
		for (let pokemon of allPokemons) {
			if (searchValue && !pokemon.name.includes(searchValue)) {
				continue;
			}
			if (
				checkboxTypes.length > 0 &&
				!checkboxTypes.includes(pokemon.types[0].type.name)
			) {
				continue;
			}
			filteredData.push(pokemon);
		}
		setPokemonData(filteredData);
	}, [allPokemons, checkboxTypes, searchValue]);
	useEffect(() => {
		fetchData(offset, limit);
	}, [offset, limit]);
	return (
		<div className=" bg-gray-600">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<MainPage
								handleSearch={handleSearch}
								allPokemons={allPokemons}
								checkboxHandler={checkboxHandler}
								pokemonData={pokemonData}
								pagination={pagination}
								offset={offset}
							/>
						}
					/>
					<Route
						path="/fight"
						element={<FighterSelect pokemonData={pokemonData} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
