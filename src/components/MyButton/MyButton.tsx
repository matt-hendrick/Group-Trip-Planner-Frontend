import React, { ReactNode } from 'react';

// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  children: ReactNode | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tip: string;
  btnClassName?: string;
  tipClassName?: string;
  placement?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
}

function MyButton({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  placement,
  color,
}: Props) {
  return (
    <Tooltip
      title={tip}
      className={tipClassName}
      placement={placement ? placement : 'top'}
    >
      <IconButton onClick={onClick} className={btnClassName} color={color}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default MyButton;
