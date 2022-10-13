import Axios from "axios";

// export var diaspora = "https://nimc-service.herokuapp.com";
// export var baseUrl = "http://localhost:5000/api/";
export var baseUrl = "https://facial-recog-middleware.herokuapp.com/api/";
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

export const getData = (route, data) => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + route, {
      method: "GET",
      body: JSON.stringify(data),
    }) // getInventory
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error("error in post api", error);
        reject(error);
      });
  });
};
