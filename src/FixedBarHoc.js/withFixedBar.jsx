import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FixedBar from "../Components/FixedBar";

const withFixedBar = (WrappedComponent) => {
  return (props) => {
    const fixedBarRef = useRef(null);
    const [paddingBottom, setPaddingBottom] = useState();
    const navigate = useNavigate();

    useEffect(() => {
      if (typeof window !== "undefined") {
        setPaddingBottom(fixedBarRef?.current?.offsetHeight);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
      }
    }, [navigate]);

    return (
      <div>
        <div style={{ paddingBottom: `${paddingBottom}px` }}>
          <FixedBar />
          <WrappedComponent {...props} fixedBarRef={fixedBarRef} />
        </div>
      </div>
    );
  };
};

export default withFixedBar;