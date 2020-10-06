import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../components/dropdown";

const Home = () => {
  const tokenStr = useSelector((state) => console.log(state));
  useEffect(() => {
    axios
      .get("/sample_vendor/validate/?nitems=1")
      .then((data) => console.log(data));
  });
  return (
    <div>
      <DropDown />
    </div>
  );
};

export default Home;
