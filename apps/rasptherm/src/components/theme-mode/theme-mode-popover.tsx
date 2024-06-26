import * as React from 'react';
import { IconButton, Popover } from '@mui/material';
import { usePopoverAnchor } from '../../hooks/popover';
import ThemeModeMenuIcon from './theme-mode-menu-icon';

interface ThemeModePopoverProps {
  children: React.ReactNode;
}

function ThemeModePopover({ children }: ThemeModePopoverProps) {
  const { popoverAnchorEl, popoverIsOpen, openPopover, closePopover } =
    usePopoverAnchor();

  return (
    <>
      <IconButton
        id="theme-mode-button"
        onClick={openPopover}
        color="inherit"
        size="large"
        aria-label="Theme mode"
        aria-haspopup="true"
        aria-controls={popoverIsOpen ? 'theme-mode-popover' : undefined}
        aria-expanded={popoverIsOpen ? true : undefined}
        aria-describedby="theme-mode-popover"
      >
        <ThemeModeMenuIcon />
      </IconButton>
      <Popover
        id="theme-mode-popover"
        anchorEl={popoverAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={popoverIsOpen}
        onClose={closePopover}
        aria-labelledby="theme-mode-button"
      >
        {children}
      </Popover>
    </>
  );
}

export default ThemeModePopover;
