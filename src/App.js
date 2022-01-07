import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";

const email = "Sincere@april.biz";

let existingUser = {
	id: "ratul",
	name: "atif",
};

const MyPosts = () => {
	const { data, isLoading, isError } = useQuery(
		"user",
		async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			return axios
				.get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
				.then((res) => res.data[0]);
		},
		{
			initialData: existingUser,
		}
	);

	return isLoading ? (
		"loading .... "
	) : isError ? (
		"error"
	) : (
		<>{JSON.stringify(data)}</>
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
