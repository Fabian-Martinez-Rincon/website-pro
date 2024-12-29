import sanitizeHtml from 'sanitize-html'
import { remarkPlugins } from '../../plugins';
import { createMarkdownProcessor } from '@astrojs/markdown-remark'

const processor = await createMarkdownProcessor({
  syntaxHighlight: false,
  remarkPlugins,
})

export const markdown2html = async (markdown: string) => {
  const html = (await processor.render(markdown)).code
  return sanitizeHtml(html)
}
