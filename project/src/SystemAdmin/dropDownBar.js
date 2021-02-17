import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";

const DropDown = (props) => {
  return (
    <MDBCol md="6" className="justify-content-center my-4">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <select className="form-control my-0 py-1" onChange={props.handleChange} type="text" placeholder={props.placeholder}>
        <option disabled="disabled" selected="selected">Select A User by...</option>
        <option>All</option>
        <option>Patient</option>
        <option>Medical Doctor</option>
        <option>Medical Admin</option>
        <option>System Admin</option>
        </select>
      </div>
    </MDBCol>
  );
}

export default DropDown;