import React from "react";
import { useDrag } from "react-dnd";
import { IItem, itemTypes } from "./container";

interface IFile {
	item: IItem;
}
export const File: React.FC<IFile> = (props) => {

	const [{isDragging},  drag] = useDrag({
		type: itemTypes.ITEM,
		item: props.item 
	,
	collect: monitor => ({
		isDragging: !!monitor.isDragging()
	})})
	return (
		<div className="bg-indigo-700 w-full h-32 mb-2"
		ref={drag}>
			<p>{props.item.name}</p>
			{isDragging && <p>im being dragged</p>}
		</div>
	);
};
