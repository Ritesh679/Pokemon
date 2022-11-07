import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import Pagination from "./Components/Pagination";
import Sidebar from "./Components/Sidebar";

export interface PokemonData {
	id: number;
	height: number;
	sprites: { front_default: string };
	name: string;
	stats: Array<{ base_stat: number; stat: { name: string } }>;
	types: Array<{ type: { name: string } }>;
	moves: Array<{ move: { name: string; url: URL } }>;
}

function App() {
	const [offset, setOffset] = useState(0);
	const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
	const [allPokemons, setAllPokemons] = useState<PokemonData[]>([]);
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
	function checkboxHandler(name: string, checked: Boolean) {
		checked && setCheckboxTypes([...checkboxTypes, name]);
		!checked &&
			setCheckboxTypes(checkboxTypes.filter((types) => types !== name));
	}
	useEffect(() => {
		fetchData(offset, limit);
	}, [offset, limit]);
	return (
		<div className="bg-gray-600">
			<div className="flex flex-row">
				<Sidebar
					handleSearch={handleSearch}
					allPokemons={allPokemons}
					checkboxHandler={checkboxHandler}
				/>
				<div className="grid grid-cols-2 md:grid-cols-3">
					{pokemonData.slice(0, 21).map((pokemon: any) => (
						<Card pokemon={pokemon} key={pokemon.id} />
					))}
				</div>
			</div>
			<Pagination pagination={pagination} offset={offset}></Pagination>
		</div>
	);
}

export default App;
