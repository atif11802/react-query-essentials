import { useQuery } from "react-query";
import axios from "axios";

function App() {
	const queryInfo = useQuery("pokemon", async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return axios
			.get("https://pokeapi.co/api/v2/pokemon")
			.then((res) => res.data.results);
	});

	return queryInfo.isLoading ? (
		"loading..."
	) : (
		<div className='App'>
			{queryInfo.data.map((pokemon) => (
				<div key={pokemon.name}>{pokemon.name}</div>
			))}
		</div>
	);
}

export default App;
