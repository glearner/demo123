import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { filterUpdate } from "../actions";

const Dropdown = (props) => {
  console.log(localStorage.getItem("vendor"));
  const [vendor, setVendor] = useState(
    localStorage.getItem("vendor") || "uniqlo-in"
  );
  const [DepartmentDropdown, setDepartmentDropdown] = useState();
  const [department, setDepartment] = useState();
  const [CategoryDrpdown, setCategoryDrodpwn] = useState();
  const [category, setCategory] = useState();
  const [count, setCount] = useState();
  const [errors, setError] = useState();
  const dispatch = useDispatch();

  const categoryChange = (event) => {
    setCategory(event.currentTarget.value);
  };

  const genderChange = (event) => {
    setDepartment(event.currentTarget.value);
  };

  const vendorChangeHandler = (event) => {
    setVendor(event.currentTarget.value);
  };

  const onClickFilter = () => {
    if (vendor) localStorage.setItem("vendor", vendor);
    if (count < 2) setCount(2);
    let obj = { category, department, vendor, count };
    dispatch(filterUpdate(obj));
  };

  const onLogoutHandler = () => {
    props.history.push({
      pathname: "/login",
    });
  };

  useEffect(() => {
    let calledVendor = vendor == "null" || vendor ? "uniqlo-in" : vendor;
    axios
      .get(`/${calledVendor}/validate/options`)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response?.data);
          setVendor(
            response?.data?.vendor != "null"
              ? response?.data?.vendor
              : "uniqlo-in"
          );
          setCategoryDrodpwn(response?.data.category);
          setDepartmentDropdown(response?.data?.department);
        } else setError(response);
      })
      .catch(function (error) {
        setError(true);
      });
  }, []);
  return (
    <Container>
      <div className="dropdown-wrapper" style={{ display: "flex" }}>
        <div className="dropdown-wrapper">
          <div className="dropdowns">
            <label
              className="user-name"
              style={{
                display: "flex",
                minWidth: "max-content",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Vendor:
              <input
                type="text"
                name="name"
                className="vendor-wrapper"
                placeholder="Enter Vendor Name"
                value={vendor}
                onChange={vendorChangeHandler}
              />
            </label>
          </div>
          <div className="dropdowns">
            <label
              className="user-name"
              style={{
                display: "flex",
                minWidth: "max-content",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Item Number:
              <input
                type="text"
                name="name"
                className="vendor-wrapper"
                placeholder="Enter Number"
                onChange={(event) => setCount(event.target.value)}
              />
            </label>
          </div>
          <div className="dropdowns">
            <select
              onClick={genderChange}
              name="Departments"
              id="Department"
              className="dropdown-items"
            >
              <option value="" selected disabled hidden>
                Gender
              </option>
              {DepartmentDropdown?.map(function (item, index) {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="dropdowns">
            <select
              onClick={categoryChange}
              name="Categories"
              id="Category"
              className="dropdown-items"
            >
              <option value="" selected disabled hidden>
                Category
              </option>
              {CategoryDrpdown?.map(function (item, index) {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
          <div className="dropdowns">
            <div className="blue-btn-filter" onClick={onClickFilter}>
              Apply Filter
            </div>
          </div>
        </div>
        <div className="logout-dropdowns">
          <div className="red-btn-filter" onClick={onLogoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </Container>
  );
};
export default withRouter(Dropdown);
