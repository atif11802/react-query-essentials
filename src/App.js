import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

function App() {
	const [pokemon, setPokemon] = useState("");
	return (
		<>
			<input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
			<PokemonSearch pokemon={pokemon} />

			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default App;

const PokemonSearch = ({ pokemon }) => {
	const queryInfo = useQuery(pokemon, async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
			.then((response) => response.data);
	});

	return queryInfo.isLoading ? (
		"loading..."
	) : queryInfo.isError ? (
		queryInfo.error.message
	) : (
		<div>
			<img src={queryInfo.data?.sprites?.front_default} alt='pokemon' />
			<br />
			{queryInfo.isFetching ? "updating..." : null}
		</div>
	);
};
