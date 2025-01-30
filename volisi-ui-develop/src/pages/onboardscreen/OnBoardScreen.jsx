import React from "react";
import Header from "../../components/core/Header";
import Centerscreen from "../CenterScreen";

const OnBoardScreen = ({onBoardHeader}) => {
  return (
    <>
      <Header onBoardHeader={true} />
      <Centerscreen />
    </>
  );
};

export default OnBoardScreen;
