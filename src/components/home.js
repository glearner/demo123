import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../components/dropdown";
import ImageBox from "./imageBox";
import { withRouter } from "react-router";
import { metaDataUpdate } from "../actions/index";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const dispatch = useDispatch();
  const filterObj = useSelector((state) => state.filter.data) || null;
  const newMetaData = useSelector((state) => state.metaData.data);

  const fetchData = async () => {
    let url = `/${filterObj.vendor || "sample_vendor"}/validate/?nitems=${
      filterObj.count || 2
    }`;
    if (filterObj.category) url += "&category=" + filterObj.category;
    if (filterObj.gender) url += "&department=" + filterObj.gender;

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
        <>
          <ImageBox style={{ marginBottom: "2rem" }} data={i} key={i.id} />
          <hr />
        </>
      ));
    return (
      <div style={{ textAlign: "center", margin: "10rem 0rem" }}>
        No more content to show
      </div>
    );
  };

  const saveApi = async (data) => {
    let url = "/sample_vendor/validate/" + data.id;
    try {
      await axios.post(url, { update_data: data });
      setChangeState(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onSaveHandler = () => {
    Object.keys(newMetaData).map((data) => {
      saveApi(newMetaData[data]);
    });
  };

  return (
    <>
      <div className="dropdown-wrapper">
        <DropDown />
      </div>
      <div style={{ margin: "1rem" }}>{renderBox()}</div>
      {data.length > 0 && (
        <div className="blue-btn" onClick={onSaveHandler}>
          Save
        </div>
      )}
    </>
  );
};

export default withRouter(Home);
