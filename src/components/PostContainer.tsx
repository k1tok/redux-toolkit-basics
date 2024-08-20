import React, { useState } from "react";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";

const PostContainer: React.FC = () => {
	const [limit] = useState(5);
	const {
		data: posts,
		error,
		isLoading,
		refetch,
	} = postAPI.useFetchAllPostsQuery(limit);
	const [createPost] = postAPI.useCreatePostMutation();
	const [updatePost] = postAPI.useUpdatePostMutation();
	const [deletePost] = postAPI.useDeletePostMutation();

	const handleCreate = async () => {
		const title = prompt("Enter title");
		await createPost({ title, body: title } as IPost);
	};

	const handleRemove = (post: IPost) => {
		deletePost(post);
	};
	const handleUpdate = (post: IPost) => {
		updatePost(post);
	};

	return (
		<div>
			<div>
				<button onClick={() => refetch()}>Refetch</button>
				<button onClick={handleCreate}>ADD POST</button>
				{isLoading && <h1>Loading...</h1>}
				{error && <h1>Error fetch posts</h1>}
				{posts?.map((post) => (
					<PostItem
						key={post.id}
						remove={handleRemove}
						update={handleUpdate}
						post={post}
					/>
				))}
			</div>
		</div>
	);
};

export default PostContainer;
