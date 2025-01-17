import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { acceptInvite, rejectInvite } from '../../redux/actions/userActions';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/GroupAdd';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';

// Components
import MyButton from '../MyButton/MyButton';

// Types
import { ReducerState } from '../../utility/sharedTypes';

function Invites() {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const invites = useSelector((state: ReducerState) => state.user.invites);
  const dispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    if (target) {
      setAnchorElement(target);
    }
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleAccept = (tripID: string, inviteID: string) => {
    dispatch(acceptInvite(tripID, inviteID));
    handleClose();
  };

  const handleReject = (tripID: string, inviteID: string) => {
    dispatch(rejectInvite(tripID, inviteID));
    handleClose();
  };

  dayjs.extend(relativeTime);

  let invitesIcon;
  if (invites && invites.length > 0) {
    invitesIcon = (
      <Badge
        badgeContent={invites.length}
        color="secondary"
        aria-label="InviteBadge"
        role="button"
      >
        <GroupIcon />
      </Badge>
    );
  } else {
    invitesIcon = <GroupIcon />;
  }
  let invitesDisplay =
    invites && invites.length > 0 ? (
      invites.map((invite) => {
        const time = dayjs(invite.createdAt).fromNow();
        const inviteID = invite.inviteID;
        const tripID = invite.tripID;
        return (
          <MenuItem key={invite.createdAt}>
            <Typography color="inherit" variant="body1">
              {invite.sender} invited you to {invite.tripName} ({time})
            </Typography>
            <MyButton
              tip="Accept"
              onClick={() => handleAccept(tripID, inviteID)}
            >
              <ThumbsUpIcon color="primary" />
            </MyButton>
            <MyButton
              tip="Reject"
              onClick={() => handleReject(tripID, inviteID)}
            >
              <ThumbsDownIcon color="secondary" />
            </MyButton>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no trip invites</MenuItem>
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
      >
        {invitesDisplay}
      </Menu>
    </Fragment>
  );
}

export default Invites;
