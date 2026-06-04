import { describe, expect, test } from 'vitest';

import { parseReadme } from './utils';

describe('Readme utils', () => {
  test('parseReadme resolves relative images for GitHub repositories', () => {
    const markdown = '![logo](img/abapGit_in_Ukraine_Colors.svg)';
    const html = parseReadme(markdown, 'https://github.com/owner/repo') as string;
    expect(html).toContain(
      'https://raw.githubusercontent.com/owner/repo/HEAD/img/abapGit_in_Ukraine_Colors.svg'
    );
  });
});
