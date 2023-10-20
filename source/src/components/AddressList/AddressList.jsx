import React from "react";
import AddressForm from "./AddressForm";

const AddressList = (props) => {

    const { dataList } = props;

  return (
    <div>
        {dataList && dataList.map((dataItem, index) =>{
            const key = `${index}`;
            return <AddressForm key={key} dataItem = {dataItem}/>
        })}
    </div>
  )
}

export default AddressList