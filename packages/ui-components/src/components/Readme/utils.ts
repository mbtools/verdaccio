import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';
// apm
import hlabap from 'highlightjs-sap-abap';
import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import markedFootnote from 'marked-footnote';
import { markedHighlight } from 'marked-highlight';

import { rewriteRelativeUrls } from './rewrite-urls';

hljs.registerLanguage('abap', hlabap); // apm

const marked = new Marked(
  markedHighlight({
    async: false,
    highlight(code, lang) {
      if (hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
});

marked.use(markedAlert());
marked.use(markedFootnote());

export function parseReadme(readme: string, repositoryUrl?: string): string | void {
  const html = marked.parse(readme);
  const htmlWithResolvedUrls = rewriteRelativeUrls(html as string, repositoryUrl);
  return DOMPurify.sanitize(htmlWithResolvedUrls);
}
