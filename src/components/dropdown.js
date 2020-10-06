import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
// import { useDispatch, useSelector } from "react-redux";

const Dropdown = () => {
	//   const tokenStr = useSelector((state) => console.log(state));
	const [Vendordropwdown, setVendorDropdown] = useState();
	const [DepartmentDropdown, setDepartmentDropdown] = useState();
	const [CategoryDrpdown, setCategoryDrodpwn] = useState();
	const [errors, setError] = useState();

	useEffect(() => {
		axios
			.get("/sample_vendor/validate/options")
			.then(function (response) {
				if (response.status === 200) {
					setVendorDropdown(response?.data?.vendor);
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
			<div className='dropdown-wrapper'>
				<div className='dropdowns'>
					<select name='Vendors' id='Vendor' className='dropdown-items'>
						{Array.isArray(Vendordropwdown) ? (
							Vendordropwdown?.map(function (item, index) {
								console.log("vendor", item);
								return <option value={item}>{item}</option>;
							})
						) : (
							<option value='sample_vendor'>{Vendordropwdown}</option>
						)}
					</select>
				</div>
				<div className='dropdowns'>
					<select name='Departments' id='Department' className='dropdown-items'>
						{DepartmentDropdown?.map(function (item, index) {
							return <option value={item}>{item}</option>;
						})}
					</select>
				</div>
				<div className='dropdowns'>
					<select name='Categories' id='Category' className='dropdown-items'>
						{CategoryDrpdown?.map(function (item, index) {
							return <option value={item}>{item}</option>;
						})}
					</select>
				</div>
			</div>
		</Container>
	);
};
export default Dropdown;
