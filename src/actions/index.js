export function loginUserSuccess(token) {
	localStorage.setItem("token", token);
	return {
		type: "LOGIN_USER_SUCCESS",
		payload: {
			token: token,
		},
	};
}

export function categoryUpdate(data) {
	return {
		type: "CATEGORY_UPDATE",
		payload: {
			category: data,
		},
	};
}

export function genderUpdate(data) {
	return {
		type: "GENDER_UPDATE",
		payload: {
			gender: data,
		},
	};
}

export function metaDataUpdate(data) {
	return {
		type: "DATA_UPDATE",
		payload: {
			data: data,
		},
	};
}
