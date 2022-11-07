import { useEffect, useState } from "react";

const Move = ({ move }: { move: { name: String; url: URL } }) => {
	const [power, setPower] = useState();
	useEffect(() => {
		const movesDetails = async (url: any) => {
			let power = await fetch(url)
				.then((res) => res.json())
				.then((data) => setPower(data.power || 0));
			return power;
		};
		movesDetails(move.url);
	}, []);
	return (
		<div className="flex text-[14px]">
			<b>{move.name} : </b>
			<p>{power}</p>
		</div>
	);
};

export default Move;
