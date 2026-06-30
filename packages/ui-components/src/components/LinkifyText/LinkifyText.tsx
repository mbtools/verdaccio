import Link from '@mui/material/Link';
import React, { Fragment } from 'react';

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

interface Props {
  children: string;
}

const LinkifyText: React.FC<Props> = ({ children }) => {
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
