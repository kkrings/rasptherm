import * as React from 'react';

interface UsePopoverAnchor {
  popoverAnchorEl: HTMLElement | null;
  popoverIsOpen: boolean;
  openPopover: (event: React.MouseEvent<HTMLElement>) => void;
  closePopover: () => void;
}

export function usePopoverAnchor(): UsePopoverAnchor {
  const [popoverAnchorEl, setPopoverAnchorEl] =
    React.useState<HTMLElement | null>(null);

  const popoverIsOpen = React.useMemo(
    () => popoverAnchorEl !== null,
    [popoverAnchorEl]
  );

  const openPopover = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setPopoverAnchorEl(event.currentTarget),
    [setPopoverAnchorEl]
  );

  const closePopover = React.useCallback(
    () => setPopoverAnchorEl(null),
    [setPopoverAnchorEl]
  );

  return {
    popoverAnchorEl,
    popoverIsOpen,
    openPopover,
    closePopover,
  };
}
