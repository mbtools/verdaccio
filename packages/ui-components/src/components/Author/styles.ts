import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';

import { Theme } from '../../Theme';

export const StyledText = styled(Typography)<{ theme?: Theme }>((props) => ({
  fontWeight: props.theme?.fontWeight?.bold ?? 700,
}));

export const AuthorListItem = styled(ListItem)({
  padding: 0,
  ':hover': {
    backgroundColor: 'transparent',
  },
});
