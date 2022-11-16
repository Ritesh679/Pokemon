import { useEffect, useState } from "react";
import { POKEMON } from "../assets/interfaces";
import FightCard from "../fightUtils/fightCard";
import { getPower, getRandomMove, getSpeed, moves } from "../fightUtils/utils";

interface PokemonState {
	hp: number;
	defence: number;
}

const Fight = ({
	firstPokemon,
	secondPokemon,
}: {
	firstPokemon: POKEMON[];
	secondPokemon: POKEMON[];
}) => {
	const [gameOver, setGameOver] = useState(false);
	const [message, setMessage] = useState([""]);
	const [pokemon1Attacked, setPokemon1Attacked] = useState(() => false);
	const [pokemon2Attacked, setPokemon2Attacked] = useState(() => false);
	let defence1 = firstPokemon[0].stats[2].base_stat;
	let defence2 = secondPokemon[0].stats[2].base_stat;
	let hp1 = firstPokemon[0].stats[0].base_stat;
	let hp2 = secondPokemon[0].stats[0].base_stat;
	const [Pokemon1State, setPokemon1State] = useState<PokemonState[]>(() => [
		{ hp: hp1, defence: defence1 },
	]);
	const [Pokemon2State, setPokemon2State] = useState<PokemonState[]>(() => [
		{ hp: hp2, defence: defence2 },
	]);

	let speed1 = getSpeed(firstPokemon);
	let speed2 = getSpeed(secondPokemon);

	function selectAttacker() {
		if (speed1 > speed2) {
			return pokemon1Attacked ? secondPokemon : firstPokemon;
		} else {
			return pokemon2Attacked ? firstPokemon : secondPokemon;
		}
	}

	const handleFight = async () => {
		let attacker = selectAttacker();
		let tempDefence1 = Pokemon1State[Pokemon1State.length - 1].defence;
		let tempDefence2 = Pokemon2State[Pokemon2State.length - 1].defence;
		let tempHP1 = Pokemon1State[Pokemon1State.length - 1].hp;
		let tempHP2 = Pokemon2State[Pokemon2State.length - 1].hp;
		try {
			if (attacker === firstPokemon) {
				const randomMove1 = getRandomMove(moves(firstPokemon));
				const currentPower1 = await getPower(randomMove1.move.url);

				setMessage((s) => [
					...s,
					`${firstPokemon[0].name} attacked and dealt a damage of ${currentPower1}`,
				]);
				tempHP2 =
					tempDefence2 < 0
						? tempHP2 - currentPower1
						: tempDefence2 - currentPower1 < 0
						? tempHP2 - Math.abs(tempDefence2 - currentPower1)
						: tempHP2;
				tempDefence2 = tempDefence2 > 0 ? tempDefence2 - currentPower1 : 0;
				setMessage((s) => [
					...s,
					`${secondPokemon[0].name}'s defence is ${
						tempDefence2 < 0 ? 0 : tempDefence2
					}`,
					`${secondPokemon[0].name} HP is now ${tempHP2 < 0 ? 0 : tempHP2} `,
				]);
				setPokemon2State((s) => [...s, { hp: tempHP2, defence: tempDefence2 }]);
				if (tempHP2 <= 0) {
					setMessage((s) => [...s, `${firstPokemon[0].name} won`]);
					setGameOver(true);
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

				tempHP1 =
					tempDefence1 < 0
						? tempHP1 - currentPower2
						: tempDefence1 - currentPower2 < 0
						? tempHP1 - Math.abs(tempDefence1 - currentPower2)
						: tempHP1;
				tempDefence1 = tempDefence1 - currentPower2;
				setMessage((s) => [
					...s,
					`${firstPokemon[0].name}'s defence is ${
						tempDefence1 < 0 ? 0 : tempDefence1
					}`,
					`${firstPokemon[0].name} HP is now ${tempHP1 < 0 ? 0 : tempHP1} `,
				]);
				setPokemon1State((s) => [...s, { hp: tempHP1, defence: tempDefence1 }]);
				if (tempHP1 <= 0) {
					setMessage((s) => [...s, `${secondPokemon[0].name} won`]);
					setGameOver(true);
				}
				setPokemon2Attacked(true);
				setPokemon1Attacked(false);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleRematch = () => {
		setGameOver(false);
		setPokemon1State(() => [{ hp: hp1, defence: defence1 }]);
		setPokemon2State(() => [{ hp: hp2, defence: defence2 }]);
		setPokemon1Attacked(false);
		setPokemon2Attacked(false);
		setMessage([]);
	};
	const undoMove = () => {
		let Pokemon1StateLength = Pokemon1State.length;
		let Pokemon2StateLength = Pokemon2State.length;
		try {
			if (Pokemon1StateLength > Pokemon2StateLength) {
				if (Pokemon1StateLength === 1) {
					console.log("cannot undo");
					return;
				}
				let currentIndex = Pokemon1StateLength - 1;
				// setPokemon1State(Pokemon1State.splice(currentIndex - 1));
				setPokemon1State(() => [
					{
						hp: Pokemon1State[currentIndex - 1].hp,
						defence: Pokemon1State[currentIndex - 1].defence,
					},
				]);
				Pokemon1StateLength -= 1;
				setPokemon1Attacked(false);
				setPokemon2Attacked(true);
			} else {
				if (Pokemon2StateLength === 1) {
					console.log("cannot undo");
					return;
				}
				let currentIndex = Pokemon2StateLength - 1;
				// setPokemon2State(Pokemon2State.splice(currentIndex - 1));
				setPokemon2State(() => [
					{
						hp: Pokemon2State[currentIndex - 1].hp,
						defence: Pokemon2State[currentIndex - 1].defence,
					},
				]);
				setPokemon1Attacked(true);
				setPokemon2Attacked(false);
			}
			gameOver
				? setMessage(message.slice(0, message.length - 4))
				: setMessage(message.slice(0, message.length - 3));
			setGameOver(false);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		handleRematch();
	}, [firstPokemon, secondPokemon]);
	return (
		<>
			<div className="flex justify-between p-[100px]">
				<FightCard
					pokemon={firstPokemon}
					defence={Pokemon1State[Pokemon1State.length - 1].defence}
					hp={Pokemon1State[Pokemon1State.length - 1].hp}
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
					defence={Pokemon2State[Pokemon2State.length - 1].defence}
					hp={Pokemon2State[Pokemon2State.length - 1].hp}
				/>
			</div>
			<div className="flex justify-center gap-3 pb-[200px]">
				{!gameOver ? (
					<button
						className="p-3 mt-4 bg-white rounded-xl"
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
				{/* {(Pokemon1State.length > 1 || Pokemon2State.length > 1) && ( */}
				<button className="px-3 bg-white rounded-xl mt-4" onClick={undoMove}>
					Undo
				</button>
				{/**)}*/}
			</div>
		</>
	);
};
export default Fight;
