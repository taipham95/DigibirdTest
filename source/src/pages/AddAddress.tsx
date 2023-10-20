import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL, TOKEN } from "../configs/constants";
import { dataService } from "../services/dataServices";
const initValue = {
  name: "",
  email: "",
  phone: "",
  shipping_address: "",
  address: "",
  city: "",
  state: "",
  country: "VN",
  zipcode: 1,
};

function AddAddress() {

    // State
  const [contactForm, setContactForm] = useState(initValue);
  const [cities, setCities] = useState([]);
  const [districtsList, setDistrictsList] = useState([]); // Thêm state để lưu trữ danh sách quận/huyện

  const navigate = useNavigate();
  const { name, email, phone, shipping_address, city, state } = contactForm;

  // Function
  //Control input values
  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onChangeCity = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const selectedCityInfo = cities.find((city) => city.name === value);
    setDistrictsList(selectedCityInfo.districts);

    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  //Control Submit
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const contactList = { 
      name: name,
      email: email,
      phone: phone,
      shipping_address: shipping_address,
      address: shipping_address,
      city: city,
      state: state,
      country: "VN",
      zipcode: 1,
    };

    // Custom Call API
    dataService.postAddress(BASE_URL, TOKEN, contactList);

    //console.log(contactList);
    setContactForm(initValue);
  };

  useEffect(() => {
    // GET request
    axios.get('https://provinces.open-api.vn/api/?depth=2')
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  return (
    <div className="container">
      <div className="d-flex mt-3">
        <h4>Thêm mới địa chỉ</h4>
        <button type="submit" className="btn btn-secondary" onClick={() => navigate('/address')}>
            Back
        </button>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3 w-25">
          <label htmlFor="name" className="form-label">
            Họ và tên
          </label>
          <input
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Nguyễn Văn Ánh"
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            placeholder="0 xxx xxx xxx"
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3 w-25">
          <label htmlFor="email" className="form-label">
            Địa chỉ email
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="example@example"
            onChange={onChangeHandler}
          />
        </div>

        <div className="mb-3 w-25">
          <label htmlFor="city" className="form-label">
            Tỉnh, thành phố
          </label>
          <select
            id="city"
            name="city"
            value={city}
            onChange={onChangeCity}
            className="form-control"
          >
            <option>Chọn tỉnh/thành phố</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 w-25">
          <label htmlFor="state" className="form-label">
            Quận, huyện
          </label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={handleDistrictChange}
            className="form-control"
          >
            <option value="">Chọn quận, huyện</option>
            {districtsList.map((district) => (
              <option key={district.code} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 w-25">
          <label htmlFor="shipping_address" className="form-label">
            Địa chỉ cụ thể
          </label>
          <input
            className="form-control"
            id="shipping_address"
            name="shipping_address"
            value={shipping_address}
            placeholder="28, đường số 8"
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddAddress;
