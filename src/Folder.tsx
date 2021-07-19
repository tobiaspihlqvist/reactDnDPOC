import React from "react";

interface IFolder {
	name: string;
}
export const Folder: React.FC<IFolder> = (props) => {
	return (
		<div className="w-full bg-red-400 h-32 mb-2">
			<p> {props.name}</p>
		</div>
	);
};
