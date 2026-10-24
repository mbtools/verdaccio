import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

import { useAuth } from '../../providers/AuthProvider';
import LinkExternal from '../LinkExternal/LinkExternal';
import LoginFormHeader from '../LoginForm/styles';
import LoginDialogCloseButton from './LoginDialogCloseButton';
import LoginDialogForm from './LoginDialogForm';

interface Props {
  open?: boolean;
  message?: string;
  onClose: () => void;
}

const LoginDialog: React.FC<Props> = ({ onClose, open = false, message }) => {
  const { userState } = useAuth();
  useEffect(() => {
    if (userState?.token) {
      onClose();
    }
  }, [onClose, userState]);
  return (
    <Dialog
      data-testid="login--dialog"
      fullWidth={true}
      maxWidth="sm"
      onClose={onClose}
      open={open}
    >
      <LoginDialogCloseButton onClose={onClose} />
      <DialogContent data-testid="dialogContentLogin">
        <LoginFormHeader />
        {message && <Typography role="status">{message}</Typography>}
        <LoginDialogForm />
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 16 }}>
          <LinkExternal to="https://abappm.com/#pricing" data-testid="signup-link">
            Not registered? Sign up at abappm.com!
          </LinkExternal>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
