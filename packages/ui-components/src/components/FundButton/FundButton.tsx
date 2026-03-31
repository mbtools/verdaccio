import styled from '@emotion/styled';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import React from 'react';
import { Trans } from 'react-i18next';

import type { Theme } from '../../Theme';
import { url } from '../../utils';
import LinkExternal from '../LinkExternal';

const StyledLink = styled(LinkExternal)<{ theme?: Theme }>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textDecoration: 'none',
  display: 'block',
}));

const StyledFavoriteIcon = styled(Favorite)<{ theme?: Theme }>(({ theme }) => ({
  color: theme.palette.love,
}));

const StyledFundButton = styled(Button)<{ theme?: Theme }>(({ theme }) => ({
  ...(theme.palette.mode === 'light' && {
    color: theme.palette.common.black,
    borderColor: theme.palette.common.black,
    '&:hover': {
      borderColor: theme.palette.common.black,
    },
  }),
}));

const StyledFundStrong = styled('strong')({
  marginRight: 3,
});

const FundButton: React.FC<{ packageMeta: any }> = ({ packageMeta }) => {
  const fundingUrl = packageMeta?.latest?.funding?.url as string;

  if (!url.isURL(fundingUrl)) {
    return null;
  }

  return (
    <StyledLink to={fundingUrl} variant="button">
      <StyledFundButton
        color="primary"
        fullWidth={true}
        startIcon={<StyledFavoriteIcon />}
        variant="outlined"
      >
        <Trans components={[<StyledFundStrong key="fund" />]} i18nKey="button.fund-this-package" />
      </StyledFundButton>
    </StyledLink>
  );
};

export default FundButton;
