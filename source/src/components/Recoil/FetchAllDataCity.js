import axios from "axios";
import {selector} from "recoil";

// Get city API
export const fetchAllDataCity = selector({
    key: 'fetchAllDataCity',
    get: async () => {
  try {
    const response = await axios.get("https://provinces.open-api.vn/api/?depth=2");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
  });


  