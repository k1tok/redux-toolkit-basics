import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./ActionCreator";

interface UserState {
	users: Array<IUser>;
	isLoading: boolean;
	error: string;
}

const initialState: UserState = {
	users: [],
	isLoading: false,
	error: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchUsers.fulfilled,
				(state, action: PayloadAction<Array<IUser>>) => {
					state.users = action.payload;
					state.isLoading = false;
					state.error = "";
				}
			)
			.addCase(fetchUsers.rejected, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === "string") {
					state.error = action.payload;
				} else {
					state.error = "Unknown error";
				}
			})
			.addCase(fetchUsers.pending, (state) => {
				state.isLoading = true;
			});
	},
});

export default userSlice.reducer;
