import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	return (
		<>
			<Pokemon queryKey='pokemon1' />
			<Pokemon queryKey='pokemon1' />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	);
}

export default App;

const Pokemon = ({ queryKey }) => {
	const queryInfo = useQuery(
		queryKey,
		async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			return axios
				.get("https://pokeapi.co/api/v2/pokemon")
				.then((res) => res.data.results);
		},
		{
			cacheTime: 5000,
		}
	);

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
