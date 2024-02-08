import React, { useCallback } from "react";
import Navigation from "components/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionType from "constants/actionTypes";
import { Button } from "uikit";
const Header = ({
	isMainPage,
}) => {
  const { authData } =  useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logout = () => {
		dispatch({ type: actionType.LOGOUT });
		navigate('/auth');
	};

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem('profile')));
  // }, []);


	const handleAuthClick = useCallback(() => {
    navigate("/auth")
	}, [navigate]);

	const handleRegClick = useCallback(() => {
    navigate("/registration")
	}, [navigate]);

	return (
	<div className="main-header">
		<div className="main-header-top">
			<div className="main-header-logo">Logo</div>
			<div className="main-header-auth">
				{
					authData
						?
							(
								<Button
									onClick={logout}
								>
									Выход
								</Button>
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
			</div>
		</div>
		{isMainPage ?? <Navigation /> }
	</div>
	)
}

export default Header;