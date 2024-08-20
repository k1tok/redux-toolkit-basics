import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/IUser";

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (_: void, thunkAPI: GetThunkAPI<object>) => {
		try {
			const response = await axios.get<Array<IUser>>(
				"https://jsonplaceholder.typicode.com/users"
			);
			return response.data;
		} catch {
			return thunkAPI.rejectWithValue("Fetch users failed");
		}
	}
);
