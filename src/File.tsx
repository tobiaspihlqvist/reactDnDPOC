import React from "react";

interface IFile {
	name: string;
}
export const File: React.FC<IFile> = (props) => {
	return (
		<div className="bg-indigo-700 w-full h-32 mb-2">
			<p>{props.name}</p>
		</div>
	);
};
