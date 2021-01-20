import React from 'react';

// Redux
import { logoutUser } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';

// MUI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MyButton from '../MyButton/MyButton';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <MyButton tip="Logout" onClick={handleLogout}>
      <ExitToAppIcon color="primary" />
    </MyButton>
  );
}

export default LogoutButton;
