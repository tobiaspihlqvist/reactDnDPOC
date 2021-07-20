import React, { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IFolder, ItemContext, itemTypes } from "./container";

interface ITemp {
	folder: IFolder;
}
export const Folder: React.FC<ITemp> = (props) => {
const {moveItemToFolder} = useContext(ItemContext);

const disableDrop = (item: any) => item.id === props.folder.id ? false : true;


	const [isOver, drop] = useDrop({
		accept: [itemTypes.ITEM, itemTypes.FOLDER],
		//@ts-ignore
		drop: (item) => moveItemToFolder(props.folder.id, item.id),
		canDrop: (item) => disableDrop(item),
		collect: monitor => ({
			isOver: !!monitor.isOver()
		}),
	})

	const [{isDragging}, drag] = useDrag({
		type: itemTypes.FOLDER,
		item: props.folder 
	,
	collect: monitor => ({
		isDragging: !!monitor.isDragging(),
	})})

	const attachRef = (el: any) => {
		drag(el)
		drop(el)
	  }
	return (
		<div className="w-full bg-red-400 h-32 mb-2"
		ref = {attachRef}>
			<p> {props.folder.name}</p>
			{isOver && <p> item is over</p>}
			{isDragging && <p> I am being dragged!</p>}

		</div>
	);
};