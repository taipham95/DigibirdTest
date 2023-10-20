import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRecoilState , useRecoilValue } from "recoil";
import { GrLocation } from 'react-icons/gr';
import { AiOutlinePhone , AiOutlineMail } from 'react-icons/ai';
import { addressListState } from "../components/Recoil/AddressState";
import { fetchAllDataCity } from '../components/Recoil/FetchAllDataCity';
import { dataService } from '../services/dataServices';
import { TOKEN } from "../configs/constants";

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

function EditAddress() {
  const navigate = useNavigate();
  const param = useParams();
  const { addressId } = param;

  const cityList = useRecoilValue(fetchAllDataCity);
  const [dataAddress, setDataAddress] = useRecoilState(addressListState);
  const userData = dataAddress.find((item) => item.xid == addressId);

  //State value change
  const [cities, setCities] = useState([]);
  const [nameAddress, setNameAddress] = useState(userData?.name);
  const [emailAddress, setEmailAddress] = useState(userData?.email);
  const [phoneAddress, setPhoneAddress] = useState(userData?.phone);
  const [city, setCity] = useState(userData?.city);
  const [state, setState] = useState(userData?.state);
  const [shippingAddress, setShippingAddress] = useState(userData?.shipping_address);
  const [contactForm, setContactForm] = useState(initValue);

  const onChangeName = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setNameAddress(value);
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onChangeEmail = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEmailAddress(value);
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onChangePhone = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setPhoneAddress(value);

    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onChangeAdress = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setShippingAddress(value);
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const onChangeCity = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setCity(value);

    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleDistrictChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setState(value);
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  //Control Submit
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const contactList = {
      ...contactForm,
      address: contactForm.shipping_address,
      country: "VN",
      zipcode: 1,
    };

    // Custom Call API
    dataService.updateAddress(addressId, TOKEN, contactList);

    navigate('/address');
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
        <h4>Chỉnh sửa địa chỉ</h4>
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
            value={nameAddress}
            placeholder="Nguyễn Văn Ánh"
            onChange={onChangeName}
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
            value={phoneAddress}
            placeholder="0 xxx xxx xxx"
            onChange={onChangePhone}
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
            value={emailAddress}
            placeholder="example@example"
            onChange={onChangeEmail}
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
            {cityList.length > 0 && city !== "" ? (
                cityList
                  .filter((data) => data.name == city)[0]
                  ?.districts.map((data) => <option>{data.name}</option>)
              ) : (
                <p>Loading...</p>
              )}
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
            value={shippingAddress}
            placeholder="28, đường số 8"
            onChange={onChangeAdress}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>

  );
}

export default EditAddress