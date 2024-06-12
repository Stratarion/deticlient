import React, { useCallback } from "react";
import Navigation from "components/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "constants/actionTypes";
import { Button } from "uikit";
import styled from "styled-components";
import Logo from "images/logo.png";

const HeaderStyled = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderAuthStyled = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`
const Header = ({
	isMainPage,
}) => {
  const { authData } =  useSelector(state => state.auth);
  console.log(authData);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		dispatch({ type: actionType.LOGOUT });
		navigate('/auth');
	};

	const handleAuthClick = useCallback(() => {
    navigate("/auth");
	}, [navigate]);

	const handleRegClick = useCallback(() => {
    navigate("/registration");
	}, [navigate]);

  const handleProfileClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const handleHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

	return (
	<HeaderStyled>
		<HeaderTopStyled>
			<img onClick={handleHomeClick} src={Logo} alt="" width="50px" />
			<HeaderAuthStyled>
				{
					authData
						?
							(
									<>
                    <Button
                      onClick={handleProfileClick}
                    >
                      {authData.name}
                    </Button>
                    <Button
                      onClick={logout}
                    >
                      Выход
                    </Button>
                  </>
							)
						:
							(
								<>
										<Button
											onClick={handleAuthClick}
										>
											Авторизация
										</Button>
										<Button
											onClick={handleRegClick}
										>
											Регистрация
										</Button>
								</>
							)
				}
			</HeaderAuthStyled>
		</HeaderTopStyled>
		{!isMainPage && <Navigation /> }
	</HeaderStyled>
	)
}

export default Header;