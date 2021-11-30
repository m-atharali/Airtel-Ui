import Axios from "axios";
export var facialUrl = "https://mysterious-sands-13000.herokuapp.com/";
export var baseUrl = "https://nimc-service.herokuapp.com/api/";
export var diaspora = "https://nimc-service.herokuapp.com";
// export var baseUrl = "http://localhost:3010/api/";
// export var diaspora = "http://localhost:3010";
export var baseImageUrl = "https://idverify-nimc.s3.eu-west-2.amazonaws.com";

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

export var fetchData = (route, item) => {
  return new Promise((resolve, reject) => {
    Axios.get(baseUrl + route, {
      params: {
        item: item,
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export var getAuth = (route, token) => {
  return new Promise((resolve, reject) => {
    Axios.get(baseUrl + route, {
      // headers: {
      //   Authorization: "Bearer " + token, //the token is a variable which holds the token
      // },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export var facialService = (route, payload) => {
  return new Promise((resolve, reject) => {
    Axios.post(facialUrl + route, payload, {
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "NIN@FACE",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export var uploadFileService = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const req = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("photo", file);

      req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          console.log("----------created ------", response);
          resolve(response);
        }
      };
      req.open("POST", `${baseUrl}file-upload`);
      req.send(formData);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export var postData3 = (route, data) => {
  return new Promise((resolve, reject) => {
    Axios.post(diaspora + route, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export var getData3 = (route, data) => {
  return new Promise((resolve, reject) => {
    Axios.get(diaspora + route, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
