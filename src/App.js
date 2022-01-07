import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	return (
		<>
			<Pokemon />
			<Berries />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default App;

const Pokemon = () => {
	const queryInfo = useQuery("pokemons", async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return axios
			.get("https://pokeapi.co/api/v2/pokemon")
			.then((res) => res.data.results);
	});

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

const Berries = () => {
	const queryInfo = useQuery("berries", async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return axios
			.get("https://pokeapi.co/api/v2/berry")
			.then((res) => res.data.results);
	});

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
