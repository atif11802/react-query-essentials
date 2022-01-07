import { useQuery } from "react-query";
import axios from "axios";

function App() {
	const queryInfo = useQuery("pokemon", () =>
		axios
			.get("https://pokeapi.co/api/v2/pokemon")
			.then((res) => res.data.results)
	);

	console.log(queryInfo);

	return (
		<div className='App'>
			{queryInfo.data?.map((pokemon) => (
				<div key={pokemon.name}>{pokemon.name}</div>
			))}
		</div>
	);
}

export default App;
