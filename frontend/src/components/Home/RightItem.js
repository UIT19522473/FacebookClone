import React from "react";

const RightItem = (props) => {
  const { id } = props;
  return (
    <div
      className={`wrap-header-right-item flex items-center justify-center text-xl  ${
        id === 1 ? "lg:hidden flex" : ""
      } ${id === 2 ? "lg:flex hidden" : ""}`}
    >
      {props.children}
    </div>
  );
};

export default RightItem;
