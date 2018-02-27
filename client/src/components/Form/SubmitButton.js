import React from "react";

const SubmitButton = props =>
  <input {...props}  className="btn">
    {props.children}
  </input>;

export default SubmitButton

