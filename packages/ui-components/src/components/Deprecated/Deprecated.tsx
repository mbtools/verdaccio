import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type Props = {
  message: string;
};

const Deprecated: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();

  return (
    // @ts-ignore - Alert does accept children despite the type error
    <Alert data-testid="deprecated-alert" severity="warning" sx={{ marginTop: 1, marginBottom: 1 }}>
      <AlertTitle>{t('deprecated.title')}</AlertTitle>
      <Typography component="span" fontWeight="bold" variant="body2">
        {t('deprecated.author-message')}{' '}
      </Typography>
      <Typography component="span" variant="body2">
        {message}
      </Typography>
    </Alert>
  );
};

export default Deprecated;
