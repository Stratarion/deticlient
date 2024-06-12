import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const OrganisationProfile = () => {

  return (
    <div>
      <Button><Link to={"organisation/add"}>Добавить организацию</Link></Button>
    </div>
  );
}
