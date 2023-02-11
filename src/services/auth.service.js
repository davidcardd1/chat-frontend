import axios from "axios";

const API_URL = "http://localhost:9090/";

const register = (username, roomID) => {
  return axios.post(
    API_URL + `/chatroom/${roomID}/join`,
    {},
    {
      params: {
        userName: username,
      },
    }
  );
};

const login = (sessionID) => {
  return axios
    .post(API_URL + "login", {
      sessionID,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
