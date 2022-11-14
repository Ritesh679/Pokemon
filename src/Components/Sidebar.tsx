import React from "react";
import { Link } from "react-router-dom";
const Sidebar = ({
	handleSearch,
	checkboxHandler,
	allPokemons,
}: {
	handleSearch: Function;
	checkboxHandler: Function;
	allPokemons: any;
}) => {
	let checkboxTypes = [
		...new Set(allPokemons.map((pokemon: any) => pokemon.types[0].type.name)),
	];
	const searchBoxHanlder = (event: any) => {
		handleSearch(event.target.value);
	};
	const checkboxHandlerSidebar = (event: any) => {
		checkboxHandler(event.target.value, event.target.checked);
	};
	return (
		<div className="ml-[10px]">
			<div className="p-[10px]">
				<input
					className="p-[10px] rounded-[10px]"
					type="text"
					placeholder="Search name or type"
					onChange={(event) => searchBoxHanlder(event)}
				/>
			</div>
			<h1 className="mb-[5px] text-left text-white">Filter Pokemons</h1>
			<div className=" p-[10px] mt-[20px] bg-white ">
				{checkboxTypes &&
					checkboxTypes.slice(0, 5).map((data: any) => {
						return (
							<div key={data} className="flex gap-3 items-center ">
								<input
									type="checkbox"
									className="mt-1"
									value={data}
									onChange={(event) => checkboxHandlerSidebar(event)}
								/>
								<label htmlFor="{data}" className="cursor-pointer">
									{data}
								</label>
							</div>
						);
					})}
			</div>
			<Link to="/fight">
				<h2 className="mt-[50px] text-left text-white">Fight Section </h2>
			</Link>
		</div>
	);
};

export default Sidebar;
