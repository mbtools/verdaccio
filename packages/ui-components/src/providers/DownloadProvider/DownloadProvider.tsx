import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import type { ReactNode } from 'react';
import React, { createContext, useCallback, use, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTarballDownload } from '../../api/use-data-mutation';
import LinkifyText from '../../components/LinkifyText';
import { downloadFile, extractFileName } from '../../utils/url';

export interface DownloadContextProps {
  downloadTarball: (args: { link: string }) => Promise<void>;
  isDownloading: boolean;
}

export const DownloadContext = createContext<DownloadContextProps | undefined>(undefined);

export const DownloadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const { download, isDownloading } = useTarballDownload();
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const downloadTarball = useCallback(
    async ({ link }: { link: string }) => {
      try {
        const fileStream = await download({ link });
        if (!fileStream) return;

        const fileName = extractFileName(link);
        downloadFile(fileStream, fileName);
      } catch (error) {
        console.error('Error during tarball download:', error);
        const message = error instanceof Error ? error.message : t('error.unspecific');
        setDownloadError(message);
      }
    },
    [download, t]
  );

  const handleCloseError = useCallback(() => {
    setDownloadError(null);
  }, []);

  return (
    <DownloadContext value={{ downloadTarball, isDownloading }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleCloseError}
        open={downloadError !== null}
      >
        {/* @ts-ignore - Alert does accept children despite the type error */}
        <Alert
          data-testid="download-tarball-error"
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          <LinkifyText>{downloadError}</LinkifyText>
        </Alert>
      </Snackbar>
    </DownloadContext>
  );
};

export const useDownload = () => {
  const context = use(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};
