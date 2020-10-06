import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropDown from "../components/dropdown";
import ImageBox from "./imageBox";

const Home = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.get("/sample_vendor/validate/?nitems=2")
			.then((data) => setData(data.data));
	}, []);

	const renderBox = () => {
		return data.map((i) => <ImageBox data={i} />);
	};

	const onDragEnd = () => {};
	return (
		<>
			<div className='dropdown-wrapper'>
				<DropDown />
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<div style={{ margin: "1rem" }}>{renderBox()}</div>
			</DragDropContext>
		</>
	);
};

export default Home;
