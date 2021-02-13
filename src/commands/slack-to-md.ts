import fs from 'fs-extra'
import path from 'path'
import getStdin from 'get-stdin'
import Turndown from 'turndown'
import { toHtml as slackToHtml } from 'light-markdown'
import { Command, flags } from '@oclif/command'

const turndownService = new Turndown()
const htmlToMarkdown = (html: string) => turndownService.turndown(html)

export default class SlackToMd extends Command {
  static description = 'describe the command here'

  static flags = {
    after: flags.string({
      char: 'a',
      description: 'use only output that comes after a given string',
    }),
    stdin: flags.boolean({
      char: 'i',
      description: 'use input from stdin',
      default: true,
    }),
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'file',
      description:
        'path to optional text file containing slack simplified-markdown',
    },
  ]

  async run() {
    const { args, flags } = this.parse(SlackToMd)

    return (!flags.stdin
      ? fs.readFile(path.resolve(__dirname, args.file), 'utf8')
      : getStdin()
    )
      .then(slackToHtml)
      .then(htmlToMarkdown)
      .then(this.log.bind(this))
  }
}
