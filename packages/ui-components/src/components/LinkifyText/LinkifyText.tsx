import Link from '@mui/material/Link';
import React, { Fragment } from 'react';

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

interface Props {
  children: string | null | undefined;
}

const LinkifyText: React.FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }

  const parts = children.split(URL_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('http://') || part.startsWith('https://') ? (
          <Link
            color="inherit"
            href={part}
            key={index}
            rel="noopener noreferrer"
            target="_blank"
            underline="always"
          >
            {part}
          </Link>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
};

export default LinkifyText;
