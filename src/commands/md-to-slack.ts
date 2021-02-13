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

const mdToSlack = (md: string) => parseMd(md).then(htmlToSlack)

export default class MdToSlack extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    stdin: flags.string({ char: 'i', description: 'use input from stdin' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file', description: 'path to markdown file' }]

  async run() {
    const { args, flags } = this.parse(MdToSlack)

    if (flags.stdin) {
      return getStdin().then(mdToSlack).then(this.log.bind(this))
    }

    if (args.file) {
      return fs
        .readFile(path.resolve(__dirname, args.file), 'utf8')
        .then(mdToSlack)
        .then(this.log.bind(this))
    }
  }
}
