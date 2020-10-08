const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "DATA_UPDATE": {
      return {
        ...state,
        data: action.payload.data,
      };
    }
    default:
      return state;
  }
}
