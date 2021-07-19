import React from "react";
import "./App.css";
import { Container } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<Container />
			</DndProvider>
		</div>
	);
}

export default App;
