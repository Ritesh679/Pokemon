import { useEffect, useState } from "react";
import { POKEMON } from "../assets/interfaces";
import FightCard from "../fightUtils/fightCard";
import { getPower, getRandomMove, getSpeed, moves } from "../fightUtils/utils";

const Fight = ({
	firstPokemon,
	secondPokemon,
}: {
	firstPokemon: POKEMON[];
	secondPokemon: POKEMON[];
}) => {
	const [gameOver, setGameOver] = useState(false);
	const [message, setMessage] = useState([""]);
	const [pokemon1Attacked, setPokemon1Attacked] = useState(false);
	const [pokemon2Attacked, setPokemon2Attacked] = useState(false);
	let defence1 = firstPokemon[0].stats[2].base_stat;
	let defence2 = secondPokemon[0].stats[2].base_stat;
	const [pokemon1Defence, setPokemon1Defence] = useState<number>(
		() => defence1
	);
	const [pokemon2Defence, setPokemon2Defence] = useState<number>(
		() => defence2
	);
	let hp1 = firstPokemon[0].stats[0].base_stat;
	let hp2 = secondPokemon[0].stats[0].base_stat;

	const [pokemon1HP, setPokemon1HP] = useState(() => hp1);
	const [pokemon2HP, setPokemon2HP] = useState(() => hp2);
	let speed1 = getSpeed(firstPokemon);
	let speed2 = getSpeed(secondPokemon);

	const handleFight = async () => {
		let attacker =
			speed1 > speed2
				? pokemon1Attacked
					? secondPokemon
					: firstPokemon
				: pokemon2Attacked
				? firstPokemon
				: secondPokemon;
		let testMessage = [];
		let tempDefence1 = pokemon1Defence;
		let tempDefence2 = pokemon2Defence;
		let tempHP1 = pokemon1HP;
		let tempHP2 = pokemon2HP;
		try {
			// while (hp1 > 0 && hp2 > 0) {
			if (attacker === firstPokemon) {
				const randomMove1 = getRandomMove(moves(firstPokemon));
				const currentPower1 = await getPower(randomMove1.move.url);

				setMessage((s) => [
					...s,
					`${firstPokemon[0].name} attacked and dealt a damage of ${currentPower1}`,
				]);
				// testMessage.push(
				// 	`${firstPokemon[0].name} attacked and dealt a damage of ${currentPower1}`
				// );
				tempHP2 =
					tempDefence2 < 0
						? tempHP2 - currentPower1
						: tempDefence2 - currentPower1 < 0
						? tempHP2 - Math.abs(tempDefence2 - currentPower1)
						: tempHP2;
				tempDefence2 = tempDefence2 > 0 ? tempDefence2 - currentPower1 : 0;
				setPokemon2Defence(tempDefence2);
				setMessage((s) => [
					...s,
					`${secondPokemon[0].name}'s defence is ${
						tempDefence2 < 0 ? 0 : tempDefence2
					}`,
				]);
				// testMessage.push(
				// 	`${secondPokemon[0].name}'s defence is ${
				// 		tempDefence2 < 0 ? 0 : tempDefence2
				// 	}`
				// );
				setPokemon2HP(tempHP2);
				setMessage((s) => [
					...s,
					`${secondPokemon[0].name} HP is now ${tempHP2 < 0 ? 0 : tempHP2} `,
				]);
				// testMessage.push(
				// 	`${secondPokemon[0].name} HP is now ${tempHP2 < 0 ? 0 : tempHP2} `
				// );
				if (tempHP2 <= 0) {
					setMessage((s) => [...s, `${firstPokemon[0].name} won`]);
					// testMessage.push(`${firstPokemon[0].name} won`);
					// setMessage(testMessage);
					setGameOver(true);
					// break;
				}
				setPokemon1Attacked(true);
				setPokemon2Attacked(false);
			}
			if (attacker === secondPokemon) {
				const randomMove2 = getRandomMove(moves(secondPokemon));
				const currentPower2 = await getPower(randomMove2.move.url);

				setMessage((s) => [
					...s,
					`${secondPokemon[0].name} attacked and dealt a damage of ${currentPower2}`,
				]);

				// testMessage.push(
				// 	`${secondPokemon[0].name} attacked and dealt a damage of ${currentPower2}`
				// );
				tempHP1 =
					tempDefence1 < 0
						? tempHP1 - currentPower2
						: tempDefence1 - currentPower2 < 0
						? tempHP1 - Math.abs(tempDefence1 - currentPower2)
						: tempHP1;
				tempDefence1 = tempDefence1 - currentPower2;
				setPokemon1Defence(tempDefence1);
				setMessage((s) => [
					...s,
					`${firstPokemon[0].name}'s defence is ${
						tempDefence1 < 0 ? 0 : tempDefence1
					}`,
					`${firstPokemon[0].name} HP is now ${tempHP1 < 0 ? 0 : tempHP1} `,
				]);
				// testMessage.push(
				// 	`${firstPokemon[0].name}'s defence is ${
				// 		tempDefence1 < 0 ? 0 : tempDefence1
				// 	}`,
				// 	`${firstPokemon[0].name} HP is now ${tempHP1 < 0 ? 0 : tempHP1} `
				// );
				setPokemon1HP(tempHP1);
				if (tempHP1 <= 0) {
					setMessage((s) => [...s, `${secondPokemon[0].name} won`]);
					// testMessage.push(`${secondPokemon[0].name} won`);
					// setMessage(testMessage);
					setGameOver(true);
					// break;
				}
				setPokemon2Attacked(true);
				setPokemon1Attacked(false);
			}
			// }
		} catch (err) {
			console.log(err);
		}
	};
	const handleRematch = () => {
		setPokemon1Defence(defence1);
		setPokemon2Defence(defence2);
		setPokemon1HP(hp1);
		setPokemon2HP(hp2);
		setGameOver(false);
		setMessage([]);
	};
	const undoMove = () => {};
	useEffect(() => {
		setPokemon1Defence(defence1);
		setPokemon2Defence(defence2);
		setPokemon1HP(hp1);
		setPokemon2HP(hp2);
		setGameOver(false);
		setMessage([]);
	}, [firstPokemon, secondPokemon]);
	return (
		<>
			<div className="flex justify-between p-[100px]">
				<FightCard
					pokemon={firstPokemon}
					defence={pokemon1Defence}
					hp={pokemon1HP}
				/>
				<div className="pt-2">
					{message.length > 0 &&
						message.map((mess, i) => (
							<li className="list-none text-white py-1" key={i}>
								{mess}
							</li>
						))}
				</div>
				<FightCard
					pokemon={secondPokemon}
					defence={pokemon2Defence}
					hp={pokemon2HP}
				/>
			</div>
			<div className="flex justify-center gap-3 pb-[200px]">
				{!gameOver ? (
					<button
						className="p-3 border-solid border-1 border-white bg-white rounded-xl"
						onClick={handleFight}
					>
						Fight
					</button>
				) : (
					<button
						className="p-3 bg-white rounded-xl mt-4"
						onClick={handleRematch}
					>
						Rematch
					</button>
				)}
				<button className="px-3 bg-white rounded-xl" onClick={undoMove}>
					Undo
				</button>
			</div>
		</>
	);
};
export default Fight;
