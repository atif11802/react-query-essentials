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

function Posts({ setPostId }) {
	const [count, increment] = useReducer((d) => d + 1, 0);

	const { data, status } = useQuery(
		"posts",
		async () => {
			const posts = await axios
				.get("https://jsonplaceholder.typicode.com/posts")
				.then((response) => response.data);

			return posts;
		},
		{
			cacheTime: 10000,
		}
	);

	return (
		<div>
			<h3>Posts:{count}</h3>
			{status === "loading" ? (
				<div>Loading...</div>
			) : status === "error" ? (
				<div>Error!</div>
			) : (
				<ul>
					{data?.map((post) => (
						<li key={post.id}>
							<Link to={`/${post.id}`}>{post.title}</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function Post() {
	const { postId } = useParams();

	console.log(postId);

	let navigate = useNavigate();
	const { data, status, isFetching } = useQuery(["post", postId], () => {
		return axios
			.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
			.then((response) => response.data);
	});

	return (
		<div>
			<h3>Post</h3>
			{status === "loading" ? (
				<div>Loading...</div>
			) : status === "error" ? (
				<div>Error!</div>
			) : (
				<ul>
					<li>
						<Link to='/'>Back</Link>
					</li>
					<li>{data.title}</li>
					<li>{data.body}</li>
					{isFetching && <div>updating...</div>}
				</ul>
			)}
		</div>
	);
}

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Posts />} />
					<Route path='/:postId' element={<Post />} />
				</Routes>
			</Router>
			<ReactQueryDevtools />
		</>
	);
}

export default App;
