import axios from "axios";
import { auth } from "../firebase";

const BASE_URL = "https://chargeit-mqtt-server.herokuapp.com";
const fetchData = async (method, url, payload = {}, authenticate = true) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...payload?.header,
  };
  if (authenticate) {
    try {
      const FIRToken = await auth?.currentUser?.getIdToken();
      headers.Authorization = `Bearer ${FIRToken}`;
      // eslint-disable-next-line no-empty
    } catch {
      console.log("user must be authenticated");
      await auth.signOut();
      return "";
    }
  }
  try {
    const { data } = await axios({
      url,
      method,
      data: payload,
      headers,
      params: method.toLowerCase() === "get" && payload,
    });
    return data;
  } catch (err) {
    const errorData = err?.response?.data;
    throw errorData.error;
  }
};

export default {
  users: {
    doesUserExist: (email) =>
      fetchData(
        "GET",
        `${BASE_URL}/user/exists/${encodeURIComponent(email)}`,
        {},
        false
      ),
  },
};
