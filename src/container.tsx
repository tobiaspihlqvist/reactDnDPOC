// import { Console } from "console";
import React from "react";
import { createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { useDrag } from "react-dnd";
// import Draggable from "react-draggable";
import { File } from "./File";
import { Folder } from "./Folder";
export const itemTypes = {
	FOLDER: "folder",
	ITEM: "item",
};
export interface IFolder {
	id: number;
	items: any[];
	name: string;
	moved: boolean;
}

export interface IItem {
	id: number;
	name: string;
	moved: boolean;
}

export const ItemContext = createContext({
	moveItemToFolder: (folderId: number, itemId: number) => {},
});

export const Container: React.FC = () => {
	const [folders, setFolders] = React.useState<IFolder[]>([
		{ id: 1, name: "mapp1", items: [], moved: false },
		{ id: 2, name: "mapp2", items: [], moved: false },
	]);
	const [items, setItems] = React.useState<IItem[]>([
		{ id: 100, name: "item1", moved: false },
		{ id: 200, name: "item2", moved: false },
	]);

	React.useEffect(() => {
		console.log(folders, items);
	}, [folders, items]);

	const moveItemToFolder = (folderId: number, itemId: number) => {
		if (itemId > 10) {
			const folder = folders.filter((f) => f.id === folderId);

			const item = items.filter((f) => f.id === itemId);
			item[0].moved = true;
			folder[0].items = [...folder[0].items, item[0]];
			setItems(items.filter((i) => i.id !== itemId).concat(item[0]));
			setFolders(folders.filter((f) => f.id !== folderId).concat(folder[0]));
			return;
		}

		const folder = folders.filter((f) => f.id === itemId);
		folder[0].moved = true;
		const finalDestination = folders.filter((f) => f.id === folderId);
		finalDestination[0].items = [...finalDestination[0].items, folder[0]];
		setFolders(
			folders.filter((f) => f.id !== folderId).concat(finalDestination[0])
		);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<ItemContext.Provider value={{ moveItemToFolder }}>
				{folders
					.filter((f) => f.moved === false)
					.map((f) => {
						return <Folder folder={f} />;
					})}
				{items
					.filter((i) => i.moved === false)
					.map((item) => {
						return <File item={item} />;
					})}
			</ItemContext.Provider>
		</DndProvider>
	);
};
