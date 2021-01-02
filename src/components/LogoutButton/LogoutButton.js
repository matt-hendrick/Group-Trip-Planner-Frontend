import React from 'react';

// Redux
import { logoutUser } from '../../redux/actions/userActions';
import { connect } from 'react-redux';

// Components
import MyButton from '../MyButton/MyButton';

// MUI Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LogoutButton(props) {
  const { onLogoutUser } = props;

  const handleLogout = () => {
    onLogoutUser();
  };

  return (
    <MyButton tip="Logout" onClick={handleLogout}>
      <ExitToAppIcon color="primary" />
    </MyButton>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
