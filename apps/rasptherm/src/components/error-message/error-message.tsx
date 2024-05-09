import { Alert, Snackbar } from '@mui/material';
import { useError } from '../../hooks/error';

function ErrorMessage() {
  const { message, isOpen, handleClose } = useError();

  return (
    <Snackbar open={isOpen} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
