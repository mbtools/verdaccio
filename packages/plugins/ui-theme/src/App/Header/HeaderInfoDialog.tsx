/* eslint-disable react/jsx-pascal-case */

/* eslint-disable verdaccio/jsx-spread */
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FlagsIcon from 'country-flag-icons/react/3x2';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Contributors from './Contributors';
import RegistryInfoDialog from './RegistryInfoDialog';
import { Support } from './Support';
import about from './about.md';
import license from './license.md';

interface Props {
  isOpen: boolean;
  onCloseDialog: () => void;
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: 3 }}>{children}</Box>}
    </div>
  );
}

const Flags = styled('span')<{ theme?: Theme }>(() => ({
  width: '25px',
}));

const HeaderInfoDialog: React.FC<Props> = ({ onCloseDialog, isOpen }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation();
  return (
    <RegistryInfoDialog
      onClose={onCloseDialog}
      open={isOpen}
      title={t('dialog.registry-info.title')}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs aria-label="basic tabs example" onChange={handleChange} value={value}>
            <Tab label={t('about')} {...a11yProps(0)} />
            <Tab label={t('dialog.license')} {...a11yProps(1)} />
            <Tab
              {...a11yProps(2)}
              icon={
                <Flags>
                  <FlagsIcon.UA />
                </Flags>
              }
            />
          </Tabs>
        </Box>
        <TabPanel index={0} value={value}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{about}</ReactMarkdown>
          <Contributors />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{license}</ReactMarkdown>
        </TabPanel>
        <TabPanel index={2} value={value}>
          <Support />
        </TabPanel>
      </Box>
    </RegistryInfoDialog>
  );
};

export default HeaderInfoDialog;
