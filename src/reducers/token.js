const initialState = {
	token: null,
	isAuthenticated: false,
	isAuthenticating: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "LOGIN_USER_SUCCESS": {
			return {
				...state,
				isAuthenticating: false,
				isAuthenticated: true,
				token: action.payload.token,
			};
		}
		default:
			return state;
	}
}
