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
				.get("http://worldtimeapi.org/api/timezone/Asia/Dhaka")
				.then((response) => response.data);
		},
		{
			refetchInterval: 1000,
			refetchIntervalInBackground: true,
		}
	);

	return (
		<div>
			<h1>Server Time: {isFetching ? <>...</> : null}</h1>
			<div>
				{isLoading ? <div>Loading...</div> : <div>{data.datetime}</div>}
			</div>
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
