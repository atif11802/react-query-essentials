import { useQuery, QueryCache, useQueryClient } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { useReducer } from "react";

const email = "Sincere@april.biz";

const fetchPosts = async () => {
	const posts = await axios
		.get("https://jsonplaceholder.typicode.com/posts")
		.then((response) => response.data);

	return posts;
};

function Posts({ setPostId }) {
	const [count, increment] = useReducer((d) => d + 1, 0);

	const { data, status } = useQuery("posts", fetchPosts, {
		onSuccess: (data) => {
			increment();
		},
		onError: (err) => {

		},
		onSettled: (data,err) => {

		}
	});

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
							<a href='#' onClick={() => setPostId(post.id)}>
								{post.title}
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function Post({ postId, setPostId }) {
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
						<a href='#' onClick={() => setPostId(-1)}>
							Back
						</a>
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
	const [postId, setPostId] = useState(-1);

	return (
		<>
			{postId > -1 ? (
				<Post postId={postId} setPostId={setPostId} />
			) : (
				<Posts setPostId={setPostId} />
			)}
			<ReactQueryDevtools />
		</>
	);
}

export default App;
