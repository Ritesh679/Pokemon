interface Stats {
	base_stat: number;
	stat: { name: string };
}
interface Types {
	type: { name: string };
}
export interface POKEMON {
	sprites: { front_default: string };
	id: number;
	name: string;
	stats: STATS[];
	moves: MOVE[];
	types: Types[];
}
interface STAT {
	name: string;
	url: URL;
}
interface STATS {
	base_stat: number;
	stat: STAT;
}
interface Types {
	type: { name: string };
}
export interface MOVE {
	move: { name: string; url: URL };
}
