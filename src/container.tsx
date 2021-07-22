import React from "react";
import { createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { File } from "./File";
import { Folder } from "./Folder";
export const itemTypes = {
	FOLDER: "folder",
	FILE: "file",
};

export interface IFolder {
	id: number;
	items: any[];
	name: string;
	moved: boolean;
}

export interface IFile {
	id: number;
	name: string;
	moved: boolean;
}

export const ItemContext = createContext({
	moveItemToFolder: (folderId: number, itemId: number) => { },
});

export const Container: React.FC = () => {
	const [folders, setFolders] = React.useState<IFolder[]>([
		{ id: 1, name: "folder1", items: [], moved: false },
		{ id: 2, name: "folder2", items: [], moved: false },
		{ id: 3, name: "folder3", items: [], moved: false },

	]);
	const [items, setItems] = React.useState<IFile[]>([
		{ id: 100, name: "file1", moved: false },
		{ id: 200, name: "file2", moved: false },
	]);

	const moveItemToFolder = (folderId: number, itemId: number) => {
		if (itemId > 10) {
			const folder = folders.filter((f) => f.id === folderId).shift();

			const item = items.filter((f) => f.id === itemId).shift();
			if (!item || !folder) return;
			item.moved = true;
			folder.items = [...folder.items, item];
			setItems(items.filter((i) => i.id !== itemId).concat(item));
			setFolders(folders.filter((f) => f.id !== folderId).concat(folder));
			return;
		}

		const folder = folders.filter((f) => f.id === itemId).shift();
		if (!folder) return;

		folder.moved = true;
		const finalDestinationFolder = folders.filter((f) => f.id === folderId).shift();
		if (!finalDestinationFolder) return;

		finalDestinationFolder.items = [...finalDestinationFolder.items, folder];
		setFolders(
			folders.filter((f) => f.id !== folderId).concat(finalDestinationFolder)
		);
	};

	return (
		<ItemContext.Provider value={{ moveItemToFolder }}>
			<div className="flex-initial">
				{folders
					.filter((f) => f.moved === false)
					.map((f) => {
						return <Folder folder={f} />;
					})}
				{items
					.filter((i) => i.moved === false)
					.map((item) => {
						return <File file={item} />;
					})}
			</div>
		</ItemContext.Provider>
	);
};
