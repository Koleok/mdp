mdp
===

cli to convert markdown to slack-markdown or the other way around

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/mdp.svg)](https://npmjs.org/package/mdp)
[![Downloads/week](https://img.shields.io/npm/dw/mdp.svg)](https://npmjs.org/package/mdp)
[![License](https://img.shields.io/npm/l/mdp.svg)](https://github.com/Koleok/mdp/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mdp
$ mdp COMMAND
running command...
$ mdp (-v|--version|version)
mdp/0.0.0 darwin-x64 node-v15.5.1
$ mdp --help [COMMAND]
USAGE
  $ mdp COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mdp hello [FILE]`](#mdp-hello-file)
* [`mdp help [COMMAND]`](#mdp-help-command)
* [`mdp md-to-slack [FILE]`](#mdp-md-to-slack-file)
* [`mdp slack-to-md [FILE]`](#mdp-slack-to-md-file)

## `mdp hello [FILE]`

describe the command here

```
USAGE
  $ mdp hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ mdp hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/Koleok/mdp/blob/v0.0.0/src/commands/hello.ts)_

## `mdp help [COMMAND]`

display help for mdp

```
USAGE
  $ mdp help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `mdp md-to-slack [FILE]`

describe the command here

```
USAGE
  $ mdp md-to-slack [FILE]

ARGUMENTS
  FILE  path to markdown file

OPTIONS
  -a, --after=after  use only output that comes after a given string
  -h, --help         show CLI help
  -i, --stdin        use input from stdin
```

_See code: [src/commands/md-to-slack.ts](https://github.com/Koleok/mdp/blob/v0.0.0/src/commands/md-to-slack.ts)_

## `mdp slack-to-md [FILE]`

describe the command here

```
USAGE
  $ mdp slack-to-md [FILE]

ARGUMENTS
  FILE  path to optional text file containing slack simplified-markdown

OPTIONS
  -a, --after=after  use only output that comes after a given string
  -h, --help         show CLI help
  -i, --stdin        use input from stdin
```

_See code: [src/commands/slack-to-md.ts](https://github.com/Koleok/mdp/blob/v0.0.0/src/commands/slack-to-md.ts)_
<!-- commandsstop -->
