import { combineReducers } from "redux";
import token from "./token";
import filter from "./filter";
import metaData from "./metaData";

export default combineReducers({ token, filter, metaData });
