import React from "react";
import Introduce from "./Introduce";
import Feature from "./Feature";
import GetStarted from "./GetStarted";

type BodyProps = {};

const Body: React.FC<BodyProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <Introduce></Introduce>
      <Feature></Feature>
      <GetStarted></GetStarted>
    </div>
  );
};
export default Body;
