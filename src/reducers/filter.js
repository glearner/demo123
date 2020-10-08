const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "CATEGORY_UPDATE": {
      return {
        ...state,
        category: action.payload.category,
      };
    }
    case "FILTER_UPDATE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
