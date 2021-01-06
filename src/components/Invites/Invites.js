import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from '../MyButton/MyButton';

// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupIcon from '@material-ui/icons/GroupAdd';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { acceptInvite, rejectInvite } from '../../redux/actions/userActions';

function Invites() {
  const [anchorElement, setAnchorElement] = useState(null);

  const invites = useSelector((state) => state.user.invites);
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setAnchorElement(event.target);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleAccept = (groupID, inviteID) => {
    dispatch(acceptInvite(groupID, inviteID));
    console.log('ran accept', groupID, inviteID);
    handleClose();
  };

  const handleReject = (groupID, inviteID) => {
    dispatch(rejectInvite(groupID, inviteID));
    console.log('ran reject');
    handleClose();
  };

  dayjs.extend(relativeTime);

  let invitesIcon;
  if (invites && invites.length > 0) {
    invitesIcon = (
      <Badge badgeContent={invites.length} color="secondary">
        <NotificationsIcon />
      </Badge>
    );
  } else {
    invitesIcon = <NotificationsIcon />;
  }
  let invitesDisplay =
    invites && invites.length > 0 ? (
      invites.map((invite) => {
        const time = dayjs(invite.createdAt).fromNow();
        const icon = (
          <GroupIcon color="secondary" style={{ marginRight: 10 }} />
        );
        const inviteID = invite.inviteID;
        const groupID = invite.groupID;
        return (
          <MenuItem
            key={invite.createdAt}
            //   onClick={handleClose}
          >
            {icon}
            <Typography color="inherit" variant="body1">
              {invite.sender} invited you to {invite.groupName} ({time})
            </Typography>
            <MyButton
              tip="Accept"
              onClick={() => handleAccept(groupID, inviteID)}
            >
              <ThumbsUpIcon color="primary" />
            </MyButton>
            <MyButton
              tip="Reject"
              onClick={() => handleReject(groupID, inviteID)}
            >
              <ThumbsDownIcon color="secondary" />
            </MyButton>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no invites yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="Invites">
        <IconButton
          aria-owns={anchorElement ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {invitesIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        // onEntered={onMenuOpened}
      >
        {invitesDisplay}
      </Menu>
    </Fragment>
  );
}

export default Invites;
