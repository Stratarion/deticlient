import React from "react";
import Header from "components/Header";

export const MainLayout = ({ isMainPage = false, children }) => {
  return (
    <div>
      <Header isMainPage={isMainPage} />
      {children}
    </div>
  );
}