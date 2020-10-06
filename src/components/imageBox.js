import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageBox = ({ data }) => {
	let subImageData = "";
	let subImageUpSellData = "";

	console.log(data);
	const [subDataCrossSell, setSubDataCrossSell] = useState([]);
	const [subDataUpSell, setSubDataUpSell] = useState([]);

	data["cross-sell"].map((i) => {
		subImageData += i + ",";
	});
	data["up-sell"].map((i) => {
		subImageUpSellData += i + ",";
	});

	useEffect(() => {
		axios
			.get("/sample_vendor/items", {
				params: { apparel_id: subImageData, primary_key: "itemcode" },
			})
			.then((data) => {
				setSubDataCrossSell(data.data);
			});

		axios
			.get("/sample_vendor/items", {
				params: { apparel_id: subImageUpSellData, primary_key: "itemcode" },
			})
			.then((data) => {
				setSubDataUpSell(data.data);
			});
	}, []);

	return (
		<div className='flex-box'>
			<img className='box-image-wrapper' src={data.image_url} />
			<div style={{ margin: "1rem" }}>
				<div>
					<div>Cross Sell</div>
					{subDataCrossSell.map((i) => {
						return (
							<img
								className='flex-subimage-wrapper'
								key={i.id}
								src={i.image_url}
							/>
						);
					})}
				</div>
				<div>
					<div>Up Sell</div>
					{subDataUpSell.map((i) => {
						return (
							<img
								className='flex-subimage-wrapper'
								key={i.id}
								src={i.image_url}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ImageBox;
