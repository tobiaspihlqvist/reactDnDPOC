import { monitorEventLoopDelay } from "perf_hooks";
import React, { useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IFolder, IItem, ItemContext, itemTypes } from "./container";

interface iNew {
	folder: IFolder;
}
export const Folder: React.FC<iNew> = (props) => {
const {moveItemToFolder, moveFolderToFolder} = useContext(ItemContext);

const disableDrop = (item: any) => {
	if(item.id === props.folder.id){
		console.log("not allowed")
		return false;
	}
	return true;
}
	const [isOver, drop] = useDrop({
		accept: [itemTypes.ITEM, itemTypes.FOLDER],
		//@ts-ignore
		drop: (item, monitor) => moveItemToFolder(props.folder.id, item.id),
		canDrop: (item, monitor) => disableDrop(item),
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

	function attachRef(el: any) {
		drag(el)
		drop(el)
	  }
	return (
		<div className="w-full bg-red-400 h-32 mb-2"
		ref = {attachRef}>
			<p> {props.folder.name}</p>
			{isOver && <p> item is over</p>}
		</div>
	);
};