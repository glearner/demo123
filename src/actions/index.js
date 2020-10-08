export function loginUserSuccess(token) {
  localStorage.setItem("token", token);
  return {
    type: "LOGIN_USER_SUCCESS",
    payload: {
      token: token,
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

export function filterUpdate(data) {
  return {
    type: "FILTER_UPDATE",
    payload: {
      data: data,
    },
  };
}
