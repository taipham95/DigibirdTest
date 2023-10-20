import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState , useRecoilValue } from "recoil";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddressList from "../components/AddressList/AddressList";
import { BASE_URL, TOKEN } from "../configs/constants";
import { addressListState , addressListSelector } from "../components/Recoil/AddressState";

function Address() {
  const [dataAddress, setDataAddress] = useRecoilState(addressListState);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setDataAddress(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dataAddress]);

  const dataList = useRecoilValue(addressListSelector);

  return (
    <div className="container">
      <a className="btn btn-primary" onClick={() => navigate("/add-address")}>
        Thêm mới
      </a>
      <AddressList dataList={dataList} />
    </div>
  );
}

export default Address;
