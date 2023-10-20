import { useNavigate } from "react-router-dom";
import { GrLocation } from 'react-icons/gr';
import { AiOutlinePhone , AiOutlineMail } from 'react-icons/ai';
import { dataService } from "../../services/dataServices";
import { TOKEN } from "../../configs/constants";

const AddressForm = (props) => {
  
  const { email, name , phone, city, shipping_address , state , country , xid } = props.dataItem;
  const navigate = useNavigate();

  // Navigate Form Edit Address
  const editForm=()=>{
    navigate(`/address/${xid}`)
  }

  // Call API Delete Form
  const deleteForm=()=>{
    dataService.deleteAddress(TOKEN, xid);
  }
  
  return (
  <div className="card" style={{width: '24rem'}}>
    <div className="card-body">
      <h4 className="card-title">Họ và tên: {name}</h4>
      <h6 className="card-title ">
        <span>
          <GrLocation/> 
          Địa chỉ
        </span>
      </h6>
      <h6 className="card-title">{shipping_address}, {state}, {city}, {country} </h6>
      <h6 className="card-title ">
        <span>
          <AiOutlinePhone/> 
          Số điện thoại
        </span>
      </h6>
      <h6 className="card-title">{phone}</h6>
      <h6 className="card-title ">
        <span>
          <AiOutlineMail/> 
          Địa chỉ email
        </span>
      </h6>
      <h6 className="card-title">{email}</h6>
      <a  className="card-link btn btn-info" onClick={editForm} >Chỉnh sửa</a>
      <a  className="card-link btn btn-danger" onClick={deleteForm}>Xoá</a>
    </div>
  </div>

)
}

export default AddressForm