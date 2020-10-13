import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../components/dropdown";
import ImageBox from "./imageBox";
import { withRouter } from "react-router";
import { metaDataUpdate } from "../actions/index";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [disableSave, setDisableSave] = useState(false);
  const [changeState, setChangeState] = useState(false);
  const [save, onSave] = useState(false);
  const dispatch = useDispatch();
  const filterObj = useSelector((state) => state.filter.data) || null;
  const newMetaData = useSelector((state) => state.metaData.data);

  const fetchData = async () => {
    let url = `/${
      filterObj.vendor || localStorage.getItem("vendor") || "uniqlo-in"
    }/validate/?nitems=${filterObj.count || 2}`;
    if (filterObj.category) url += "&category=" + filterObj.category;
    if (filterObj.department) url += "&department=" + filterObj.department;

    let data = [];
    try {
      data = await axios.get(url);
      setData(data.data);
      let metaData = {};
      let newData = data?.data;
      newData.map((e) => {
        metaData[e.itemcode] = e;
      });
      dispatch(metaDataUpdate(metaData));
    } catch (err) {
      if (err?.response?.status === 404) setData([]);
      else
        props.history.push({
          pathname: "/login",
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterObj, changeState]);

  const renderBox = () => {
    if (data.length > 0)
      return data.map((i) => (
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <ImageBox style={{ marginBottom: "2rem" }} data={i} key={i.id} />
          <hr />
        </div>
      ));
    return (
      <div style={{ textAlign: "center", margin: "10rem 0rem" }}>
        No more content to show
      </div>
    );
  };

  // const saveApi = async (data) => {
  //   let url =
  //     `/${
  //       filterObj.vendor || localStorage.getItem("vendor") || "uniqlo-in"
  //     }/validate/` + data.id;
  //   try {
  //     await axios.post(url, { update_data: data });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const saveApi = (data) => {
    let url =
      `/${
        filterObj.vendor || localStorage.getItem("vendor") || "uniqlo-in"
      }/validate/` + data.id;

    return axios.post(url, { update_data: data });
  };

  const onSaveHandler = async () => {
    setDisableSave(true);
    let caggedArray = [];
    Object.keys(newMetaData).map((data) => {
      caggedArray.push(saveApi(newMetaData[data]));
    });

    Promise.all(caggedArray)
      .then((results) => {
        console.log(results);
        setDisableSave(false);
        onSave(true);
        setTimeout(() => {
          onSave(false);
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  const onNextHandler = () => {
    fetchData();
  };

  return (
    <>
      <div className="dropdown-wrapper">
        <DropDown />
      </div>

      <div style={{ margin: "1rem" }}>{renderBox()}</div>
      {save && (
        <p style={{ textAlign: "center", color: "green" }}>Data Saved</p>
      )}
      {data.length > 0 && (
        <div
          className="flex"
          style={{
            width: "33%",
            margin: "auto",
            marginTop: "3rem",
            alignContent: "space-between",
          }}
        >
          <button
            disabled={disableSave}
            className="blue-btn"
            onClick={onSaveHandler}
          >
            Save
          </button>
          <button className="blue-btn" onClick={onNextHandler}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default withRouter(Home);
