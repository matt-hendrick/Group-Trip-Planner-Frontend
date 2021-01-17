import React from 'react';

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

function MyButton({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  placement,
}) {
  return (
    <Tooltip
      title={tip}
      className={tipClassName}
      placement={placement ? placement : 'top'}
    >
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default MyButton;
