import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
	const tokenStr = useSelector((state) => console.log(state));
	useEffect(() => {
		axios
			.get("/sample_vendor/validate/?nitems=1")
			.then((data) => console.log(data));
	});
	return <div>Home</div>;
};

export default Home;
