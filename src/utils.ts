import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'

export function wrap(string: string, ...wrappers: any) {
  return [...wrappers, string, ...wrappers.reverse()].join('')
}

export const parseMd = (md: string) =>
  new Promise((res, rej) =>
    unified()
      .use(markdown)
      .use(html)
      .process(md, (err, file) => (err ? rej(err) : res(String(file))))
  )

export const bullet = '•'

export const fixBullets = (slackMd: string) =>
  slackMd.replace(/\n\s*(\*)/g, `\n  ${bullet}`)

// so many thanks to https://stephencharlesweiss.com/regex-markdown-link
export const fixLinks = (slackMd: string) =>
  slackMd.replace(
    /!?\[([^\]]*)\]\(([^\)]+)\)/gm,
    (match, linkText, url) => `<${url}|${linkText}>`
  )

export const after = (token: string) => (x: string) => x.split(token)[1]

export const id = (x) => x
