import fs from 'fs-extra'
import path from 'path'
import getStdin from 'get-stdin'
import htmlToSlack from 'html-slack'
import { Command, flags } from '@oclif/command'
import { parseMd, after, id, fixBullets, fixLinks } from '../utils'

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
