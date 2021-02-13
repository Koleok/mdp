import fs from 'fs-extra'
import path from 'path'
import getStdin from 'get-stdin'
import unified from 'unified'
import markdown from 'remark-parse'
import html from 'remark-html'
import htmlToSlack from 'html-slack'
import { Command, flags } from '@oclif/command'

const parseMd = (md: string) =>
  new Promise((res, rej) =>
    unified()
      .use(markdown)
      .use(html)
      .process(md, (err, file) => (err ? rej(err) : res(String(file))))
  )

const bullet = '•'

const fixBullets = (slackMd: string) =>
  slackMd.replace(/\n\s*(\*)/g, `\n  ${bullet}`)

// so many thanks to https://stephencharlesweiss.com/regex-markdown-link
const fixLinks = (slackMd: string) =>
  slackMd.replace(
    /!?\[([^\]]*)\]\(([^\)]+)\)/gm,
    (match, linkText, url) => `<${url}|${linkText}>`
  )

const after = (token: string) => (x: string) => x.split(token)[1]

const id = (x) => x

export default class MdToSlack extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    after: flags.string({
      char: 'a',
      description: 'use only output that comes after a given string',
    }),
    stdin: flags.boolean({
      char: 'i',
      description: 'use input from stdin',
      default: false,
    }),
  }

  static args = [{ name: 'file', description: 'path to markdown file' }]

  async run() {
    const { args, flags } = this.parse(MdToSlack)

    return (flags.stdin
      ? getStdin()
      : fs.readFile(path.resolve(__dirname, args.file), 'utf8')
    )
      .then(parseMd)
      .then(htmlToSlack)
      .then(flags.after ? after(flags.after) : id)
      .then(fixBullets)
      .then(fixLinks)
      .then(this.log.bind(this))
  }
}
