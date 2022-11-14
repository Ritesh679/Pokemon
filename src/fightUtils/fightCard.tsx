import Move from "../Components/Move";
import { POKEMON } from "../assets/interfaces";
import { useEffect } from "react";

const FightCard = ({ pokemon, HP }: { pokemon: POKEMON; HP: number }) => {
	return (
		<div className="">
			<div className="flex m-[10px]">
				<div className="w-[350px] h-auto px-[10px] py-[20px] bg-white rounded-[10px] overflow-hidden">
					<div className="text-center">
						<img
							className="mx-auto"
							src={pokemon.sprites.front_default}
							alt="ok"
						/>
						<strong>{pokemon.name}</strong>
						<div className="flex justify-center mb-2 items-center">
							{pokemon.types.map((poke, i: number) => {
								return (
									<div key={`${poke.type.name}` + i}>{poke.type.name}</div>
								);
							})}
						</div>
					</div>
					<h1 className="text-left">Stats</h1>
					<div className="flex ml-3 text-[14px]">
						<div className="w-[300px]">
							{pokemon.stats.map((stat, i: number) => {
								if (i < 3) {
									return (
										<div className="flex" key={i}>
											<b>{stat.stat.name} : </b>
											<p>{stat.stat.name === "hp" ? HP : stat.base_stat}</p>
										</div>
									);
								}
							})}
						</div>
						<div className="h-[70px] border-r-2 border-gray-800 ml-[-30px]"></div>
						<div className="ml-3 w-[300px]">
							{pokemon.stats.map((stat, i: number) => {
								if (i >= 3) {
									return (
										<div className="flex" key={i}>
											<b>{stat.stat.name} : </b>
											<p>{stat.base_stat}</p>
										</div>
									);
								}
							})}
						</div>
					</div>
					<h1 className="text-left">Moves</h1>
					<div className="flex justify-between">
						<div className="flex flex-col">
							{pokemon.moves.slice(0, 4).map((move, i: number) => {
								if (i < 2) {
									return (
										<div key={`${move.move.name}`}>
											<Move move={move.move} />
										</div>
									);
								}
							})}
						</div>
						<div className="flex flex-col ml-3 mr-3">
							{pokemon.moves
								.slice(0, 4)
								.map(
									(move: { move: { name: String; url: URL } }, i: number) => {
										if (i >= 2) {
											return (
												<div key={`${move.move.name}`}>
													<Move move={move.move} />
												</div>
											);
										}
									}
								)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FightCard;
