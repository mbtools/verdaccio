import DOMPurify from 'dompurify';
import hljs from 'highlight.js/lib/common';
// apm
import hlabap from 'highlightjs-sap-abap';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

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

export function parseReadme(readme: string): string | void {
  const html = marked.parse(readme);
  return DOMPurify.sanitize(html as string);
}
