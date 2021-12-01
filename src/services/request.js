import Axios from "axios";

// export var diaspora = "https://nimc-service.herokuapp.com";
export var baseUrl = "http://localhost:5000/api/";

export var postData = (route, data) => {
  return new Promise((resolve, reject) => {
    Axios.post(baseUrl + route, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
