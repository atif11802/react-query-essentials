import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

const email = "Sincere@april.biz";

const MyPosts = () => {
	const { data, isLoading, isError } = useQuery("user", () => {
		return axios
			.get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
			.then((res) => res.data[0]);
	});

	const postsQuery = useQuery("posts", () => {
		return axios
			.get(`https://jsonplaceholder.typicode.com/posts?userId=${data.id}`)
			.then((response) => response.data);
	});

	console.log(postsQuery);

	return isLoading ? (
		"loading .... "
	) : isError ? (
		"error"
	) : (
		<>
			{data.name}
			{data.id}
			<br />
			<br />
			{postsQuery.isIdle ? null : postsQuery.isLoading ? (
				"loading posts..."
			) : (
				<h3>posts count : {postsQuery?.data?.length}</h3>
			)}
		</>
	);
};

function App() {
	return (
		<>
			<MyPosts />
			<ReactQueryDevtools />
		</>
	);
}

export default App;
