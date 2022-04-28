import React from "react";

const Icon = ({ id, className, onClick }) => {
  return <i id={id} onClick={onClick} className={className} />;
};

export default Icon;
