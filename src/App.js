import { useQuery, QueryCache, useQueryClient } from "react-query";
import axios from "axios";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	Link,
	useParams,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import { useReducer } from "react";

function Posts() {
	const { data, status, isLoading, isFetching } = useQuery(
		"posts",
		async () => {
			return await axios
				.get(
					"http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5'"
				)
				.then((response) => response.data);
		}
	);
	console.log(data);
	return (
		<div>
			<h1>Random Number: {isFetching ? <>...</> : null}</h1>
			{/* <div>
				{isLoading ? <div>Loading random number...</div> : <div>{data}</div>}
			</div> */}
		</div>
	);
}

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Posts />} />
				</Routes>
			</Router>
			<ReactQueryDevtools />
		</>
	);
}

export default App;
