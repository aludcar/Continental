import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Response = () => {
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    queryParameters.forEach((param) => console.log(param));
  }, []);
  return <div>Response</div>;
};

export default Response;
