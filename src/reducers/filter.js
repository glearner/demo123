const initialState = {
	category: null,
	gender: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case "CATEGORY_UPDATE": {
			return {
				...state,
				category: action.payload.category,
			};
		}
		case "GENDER_UPDATE": {
			return {
				...state,
				gender: action.payload.gender,
			};
		}
		default:
			return state;
	}
}
