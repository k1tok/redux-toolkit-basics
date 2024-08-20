import React from "react";
import { IPost } from "../models/IPost";

interface IPostItemProps {
	post: IPost;
	remove: (post: IPost) => void;
	update: (post: IPost) => void;
}
const PostItem: React.FC<IPostItemProps> = ({ post, remove, update }) => {
	const handleRemove = (event: React.MouseEvent) => {
		event.stopPropagation();
		remove(post);
	};

	const handleUpdate = () => {
		const title = prompt("Enter title", post.title);
		update({ ...post, title } as IPost);
	};

	return (
		<div
			onClick={handleUpdate}
			style={{
				display: "flex",
				justifyContent: "space-between",
				border: "2px solid white",
				padding: "0.25rem",
				width: "100%",
			}}
		>
			{post.id}. {post.title}
			<button onClick={handleRemove}>Delete</button>
		</div>
	);
};

export default PostItem;
