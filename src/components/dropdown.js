import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";

import { categoryUpdate, genderUpdate } from "../actions";

const Dropdown = () => {
	const [Vendordropwdown, setVendorDropdown] = useState();
	const [DepartmentDropdown, setDepartmentDropdown] = useState();
	const [CategoryDrpdown, setCategoryDrodpwn] = useState();
	const [errors, setError] = useState();
	const dispatch = useDispatch();

	const categoryChange = (event) => {
		dispatch(categoryUpdate(event.currentTarget.value));
	};

	const genderChange = (event) => {
		dispatch(genderUpdate(event.currentTarget.value));
	};

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
						<option value='' selected disabled hidden>
							Vendor
						</option>
						{Array.isArray(Vendordropwdown) ? (
							Vendordropwdown?.map(function (item, index) {
								return <option value={item}>{item}</option>;
							})
						) : (
							<option value='sample_vendor'>{Vendordropwdown}</option>
						)}
					</select>
				</div>
				<div className='dropdowns'>
					<select
						onClick={genderChange}
						name='Departments'
						id='Department'
						className='dropdown-items'
					>
						<option value='' selected disabled hidden>
							Gender
						</option>
						{DepartmentDropdown?.map(function (item, index) {
							return <option value={item}>{item}</option>;
						})}
					</select>
				</div>
				<div className='dropdowns'>
					<select
						onClick={categoryChange}
						name='Categories'
						id='Category'
						className='dropdown-items'
					>
						<option value='' selected disabled hidden>
							Category
						</option>
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
