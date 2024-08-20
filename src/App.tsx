import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsers } from "./store/reducers/ActionCreator";
import PostContainer from "./components/PostContainer";

const App: React.FC = () => {
	const { users, isLoading, error } = useAppSelector(
		(state) => state.userReducer
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	return (
		<div style={{ display: "flex", gap: "2rem" }}>
			<div>
				{isLoading && <h1>Loading...</h1>}
				{error && <h1>{error}</h1>}
				{users.map((user) => (
					<div
						key={user.id}
						style={{
							display: "flex",
							flexDirection: "column",
							border: "2px solid white",
							padding: "0.25rem",
						}}
					>
						<div>{user.name}</div>
						<div>{user.email}</div>
					</div>
				))}
			</div>
			<div>
				<PostContainer />
			</div>
		</div>
	);
};

export default App;
