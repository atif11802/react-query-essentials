import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

function App() {
	const [show, setShow] = useState(false);
	const queryInfo = useQuery(
		"pokemon",
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

	return show && queryInfo.isLoading ? (
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
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
}

export default App;
