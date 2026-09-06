import React from 'react';

import Readme from '../../components/Readme';
import { normalizeRepositoryUrl } from '../../components/Readme/rewrite-urls';
import { useVersion } from '../../providers';
import { formatRepository } from '../../utils/utils';

interface Props {
  description?: string;
}

const DetailContainerContentReadme: React.FC<Props> = ({ description }) => {
  const { packageMeta } = useVersion();
  const repository = formatRepository(packageMeta?.latest?.repository);
  const repoUrl = repository ? (normalizeRepositoryUrl(repository) ?? undefined) : undefined;

  if (!description) {
    return null;
  }

  return <Readme description={description} repoUrl={repoUrl} />;
};

export default DetailContainerContentReadme;
