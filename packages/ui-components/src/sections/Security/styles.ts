import type { StyledComponent } from '@emotion/styled';
import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import type { ComponentProps } from 'react';

import type { Theme } from '../../';

export const SecurityContainer: StyledComponent<ComponentProps<typeof Box> & { theme?: Theme }> =
  styled(Box)<{ theme?: Theme }>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  }));

export const SecurityForm = styled('form')<{ theme?: Theme }>(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export const SecurityTextField = styled(TextField)<{ theme?: Theme }>(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
