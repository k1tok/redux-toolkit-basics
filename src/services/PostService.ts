import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../models/IPost";

export const postAPI = createApi({
	reducerPath: "postAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
	}),
	tagTypes: ["Posts"],
	endpoints: (build) => ({
		fetchAllPosts: build.query<Array<IPost>, number>({
			query: (limit = 5) => ({
				url: "/posts",
				params: {
					_limit: limit,
				},
			}),
			providesTags: ["Posts"],
		}),
		createPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: "/posts",
				method: "POST",
				body: post,
			}),
			invalidatesTags: ["Posts"],
		}),
		updatePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: "PUT",
				body: post,
			}),
			invalidatesTags: ["Posts"],
		}),
		deletePost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: "DELETE",
				body: post,
			}),
			invalidatesTags: ["Posts"],
		}),
	}),
});
