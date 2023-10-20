import axios from "axios";

export const dataService = {
  postAddress: (URL, TOKEN, data) =>
    axios
      .post(URL, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("New data:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      }),

  updateAddress: (id, TOKEN, data) =>
    axios
      .put(`https://dev-pos.digibird.io/api/v1/front/self/address/${id}`, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        console.log("New data:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      }),

  deleteAddress: (TOKEN, id) =>
    axios
      .delete(`https://dev-pos.digibird.io/api/v1/front/self/address/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then(() => {
        console.log("Data deleted");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      }),
};
