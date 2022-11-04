import { useEffect } from "react";

type DataDTO = { name: string; url: string }[];

const Card = ({ pokemon }: { pokemon: any }) => {
	useEffect(() => {
		const movesDetails = async () =>
			await fetch(pokemon.url).then((res) => res.json());
		console.log(movesDetails);
	});
	console.log(pokemon);
	return (
		<div className="">
			<div className="flex m-[10px]">
				<div className="w-[400px] h-auto px-[10px] py-[20px] bg-white rounded-[10px] overflow-hidden">
					<div className="text-center">
						<div className="ml-auto mr-auto w-6/12">
							<img
								src={pokemon.sprites.front_default}
								alt="ok"
								height={100}
								width={150}
							/>
							<strong>{pokemon.name}</strong>
						</div>
						<div className="flex justify-center mb-2 items-center">
							{pokemon.types.map(
								(poke: { slot: Number; type: { name: String; url: URL } }) => {
									return <div>{poke.type.name}</div>;
								}
							)}
						</div>
					</div>
					<h1 className="text-left">Stats</h1>
					<div className="flex justify-between ml-3">
						<div className="ml-[10px] px-2 w-[300px]">
							{pokemon.stats.map(
								(
									stat: { base_stat: String; stat: { name: String } },
									i: number
								) => {
									if (i < 3) {
										return (
											<div className="flex" key={i}>
												<b>{stat.stat.name} : </b>
												<p>{stat.base_stat}</p>
											</div>
										);
									}
								}
							)}
						</div>
						<div className="h-[70px] border-r-2 border-gray-800 w-2"></div>
						<div className="ml-2 w-[300px]">
							{pokemon.stats.map(
								(
									stat: { base_stat: String; stat: { name: String } },
									i: number
								) => {
									if (i >= 3) {
										return (
											<div className="flex" key={i}>
												<b>{stat.stat.name} : </b>
												<p>{stat.base_stat}</p>
											</div>
										);
									}
								}
							)}
						</div>
					</div>
					<h1 className="text-left">Moves</h1>
					<div className="grid grid-cols-2">
						{pokemon.moves
							.slice(0, 4)
							.map((move: { move: { name: String; url: URL } }, i: number) => {
								return (
									<div key={i}>
										<b>{move.move.name} : </b>
										<p></p>
									</div>
								);
							})}
					</div>
					<div className="flex justify-between">
						<div className="ml-[20px] flex-1/4">{}</div>
						<hr className="rotate-90" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
