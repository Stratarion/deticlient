import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";

const Navigation = () => {
	const navigate = useNavigate();
  const handleGoBackClick = useCallback(() => {
	  navigate(-1);
	}, [navigate]);

  const handleGoForwardClick = useCallback(() => {
	  navigate(1);
	}, [navigate]);

  return (
    <Flex gap="10px">
      <Button onClick={handleGoBackClick} className="list">
        Назад
      </Button>
      <Button onClick={handleGoForwardClick} className="list">
        Вперёд
      </Button>
    </Flex>
  )
};

export default Navigation;