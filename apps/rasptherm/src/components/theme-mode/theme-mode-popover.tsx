import * as React from 'react';
import { IconButton, Popover } from '@mui/material';
import ThemeModeMenuIcon from '@mui/icons-material/DarkMode';
import { usePopoverAnchor } from '../../hooks/popover';

interface ThemeModePopoverProps {
  children: React.ReactNode;
}

function ThemeModePopover({ children }: ThemeModePopoverProps) {
  const { popoverAnchorEl, popoverIsOpen, openPopover, closePopover } =
    usePopoverAnchor();

  return (
    <>
      <IconButton
        onClick={openPopover}
        color="inherit"
        size="large"
        aria-describedby="theme-mode-popover"
      >
        <ThemeModeMenuIcon />
      </IconButton>
      <Popover
        id="theme-mode-popover"
        anchorEl={popoverAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={popoverIsOpen}
        onClose={closePopover}
      >
        {children}
      </Popover>
    </>
  );
}

export default ThemeModePopover;
