import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import Pagination from "./Components/Pagination";

// let url = "https://pokeapi.co/api/v2/pokemon/";

function App() {
	const [offset, setOffset] = useState(0);
	const [pokemonData, setPokemonData] = useState<any>([]);
	const [allPokemons, setAllPokemons] = useState<any>([]);

	const fetchData = async (offset: number) => {
		let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
		let res: any = await getPokemons(url);
		console.log(res, "response yeha xa");
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
	useEffect(() => {
		fetchData(offset);
	}, [offset]);
	return (
		<div className="bg-gray-600">
			<div className="grid grid-cols-3">
				{pokemonData &&
					pokemonData.map((pokemon: any) => (
						<Card pokemon={pokemon} key={pokemon.id} />
					))}
			</div>
			<Pagination pagination={pagination} offset={offset}></Pagination>
		</div>
	);
}

export default App;
