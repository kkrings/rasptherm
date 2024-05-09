import { SyntheticEvent, useCallback, useMemo } from 'react';
import { dismissLatestError, getLatestError } from '../store/error.slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface UseError {
  message: string;
  isOpen: boolean;
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

export function useError(): UseError {
  const { message, dismissed } = useAppSelector(getLatestError);

  const isOpen = useMemo(() => !dismissed, [dismissed]);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(
    (_: SyntheticEvent | Event | undefined, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      dispatch(dismissLatestError());
    },
    [dispatch]
  );

  return {
    message,
    isOpen,
    handleClose,
  };
}
