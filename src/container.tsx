// import { Console } from "console";
import React from "react";
// import { useDrag } from "react-dnd";
// import Draggable from "react-draggable";
import { File } from "./File";
import { Folder } from "./Folder";

export const Container: React.FC = () => {
	const [activeFolder, setActiveFolder] = React.useState<any>(null);
	const folders = [
		{ id: 1, name: "mapp1", items: [] },
		{ id: 2, name: "mapp2", items: [] },
	];
	let items = ["item1", "item2"];

	React.useEffect(() => {}, [activeFolder, items]);

	// const [newIteminNewFolder, setNewIteminNewFolder] =
	// React.useState<any>(undefined);
	const addItemToFolder = (item: any) => {
		if (activeFolder) {
			console.log(activeFolder);
			setTimeout(() => {}, 1000);
			// setNewIteminNewFolder(`${activeFolder}, ${item}`);
			setActiveFolder(null);
			items = items.filter((i) => i !== item);
		}
	};
	return (
		<>
			{folders.map((f) => {
				return (
					// onMouseEnter={() => setActiveFolder(f.name)}
					// onMouseLeave={() => setActiveFolder(f.name)}
					<Folder
						name={f.name}
						// className="bg-red-200 h8 w-full pb-2 pt-2 mb-1 mt-1"
					>
						{/* <p className="text-indigo-900	">{f.name}</p> */}
					</Folder>
				);
			})}
			{items.map((item) => {
				return (
					// <Draggable
					// 	axis="y"
					// 	onStop={() => addItemToFolder(item)}
					// 	handle=".handle"
					// >
					<File name={item} />
					// </Draggable>
				);
			})}
			<button onClick={() => alert(items)}>
				Klicka mig för att se om jag blev tillagd eller ej
			</button>
		</>
	);
};
