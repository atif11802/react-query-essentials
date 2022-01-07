import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	return (
		<>
			<Count />
			<Pokemon />

			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default App;

const usePokemon = () => {
	return useQuery("pokemons", async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return axios
			.get("https://pokeapi.co/api/v2/pokemon")
			.then((res) => res.data.results);
	});
};

const Count = () => {
	const queryInfo = usePokemon();
	return <h3>you are looking at {queryInfo.data?.length} pokemon</h3>;
};

const Pokemon = () => {
	const queryInfo = usePokemon();

	return queryInfo.isLoading ? (
		"loading..."
	) : queryInfo.isError ? (
		queryInfo.error.message
	) : (
		<div>
			{queryInfo.data?.map((pokemon) => (
				<div key={pokemon.name}>{pokemon.name}</div>
			))}
			<br />
			{queryInfo.isFetching ? "updating..." : null}
		</div>
	);
};
