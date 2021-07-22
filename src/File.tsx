import React from "react";
import { useDrag } from "react-dnd";
import { IFile, itemTypes } from "./Container";


export const File: React.FC<{ file: IFile }> = (props) => {

	const [{ isDragging }, drag] = useDrag({
		type: itemTypes.FILE,
		item: props.file
		,
		collect: monitor => ({
			isDragging: !!monitor.isDragging()
		})
	})
	return (
		<div className="bg-indigo-700 h-32 mb-2 flex-1 justify-center content-center"
			ref={drag}>
			<p className="flex-initial">{props.file.name}</p>
			{isDragging && <p>im being dragged</p>}
		</div>
	);
};
