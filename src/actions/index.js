export function loginUserSuccess(token) {
	localStorage.setItem("token", token);
	return {
		type: "LOGIN_USER_SUCCESS",
		payload: {
			token: token,
		},
	};
}
