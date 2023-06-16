import axios from "../axios";

const handleLoginApiService = (userEmail, userPassword) => {
  return axios.post("api/login", { email: userEmail, password: userPassword });
};

const getAllUsersService = (inputId) => {
  //temple string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("Check data from service: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

export {
  handleLoginApiService,
  getAllUsersService,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
};
