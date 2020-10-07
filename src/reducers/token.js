const initialState = {
	token: null,
	isAuthenticated: false,
	isAuthenticating: false,
	category: null,
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
		case "CATEGORY_UPDATE": {
			return {
				...state,
				category: action.payload.category,
			};
		}
		default:
			return state;
	}
}
