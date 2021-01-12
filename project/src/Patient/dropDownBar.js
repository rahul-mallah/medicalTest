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
        <option disabled="disabled" selected="selected">Select A Department.</option>
        <option>All</option>
        <option>General Practitioner (Non-specialist)</option>
        <option>Anesthesiology</option>
        <option>Cardiology</option>
        <option>Dermatology</option>
        <option>Endocrinology</option>
        <option>Gastroenterology</option>
        <option>Haematology</option>
        <option>Immunology</option>
        <option>Infectious Diseases</option>
        <option>Neurology</option>
        <option>Oncology</option>
        <option>Orthopaedic</option>
        <option>Psychiatry</option>
        <option>Rheumatology</option>
        <option>Urology</option>
        </select>
      </div>
    </MDBCol>
  );
}

export default DropDown;