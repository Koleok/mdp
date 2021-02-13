import { wrap } from './utils'
import Compiler from 'remark-stringify'

// fixes slack in-word formatting (e.g. hel*l*o)
const zeroWidthSpace = String.fromCharCode(0x200b)

// noinspection JSUnusedGlobalSymbols
const visitors = {
  heading(node) {
    return wrap(this.content(node), '*')
  },

  strong(node) {
    return wrap(this.content(node), zeroWidthSpace, '*')
  },

  delete(node) {
    return wrap(this.content(node), zeroWidthSpace, '~')
  },

  emphasis(node) {
    return wrap(this.content(node), zeroWidthSpace, '_')
  },

  list(node) {
    const listItem = this.visitors.listItem.bind(this)

    return node.children
      .map((child, index) => {
        const bullet = node.ordered ? `${node.start + index}.` : '●'

        return listItem(child, node, index, bullet)
      })
      .join('\n')
  },
}

class SlackCompiler extends Compiler {
  constructor(...args) {
    super(...args)
    this.visitors = Object.assign(this.visitors, visitors)
  }

  content(node) {
    return this.all(node).join('')
  }
}

module.exports = function slackify(options) {
  const xtend = require('xtend')
  SlackCompiler.prototype.options = xtend(
    SlackCompiler.prototype.options,
    this.data('settings'),
    options
  )
  // noinspection JSUnusedGlobalSymbols
  this.Compiler = SlackCompiler
}
