# tipm

  Titanium package manager.

## Installation

     $ npm install -g tipm

## Installing packages

  To install one or more packages, simply pass their github
  repo names as arguments to `tipm install`. Dependencies
  are resolved and the tipm module contents are downloaded into your
  apps `module/commonjs/` directory by default. View `tipm help install` for details.

```
$ tipm install tipm/monglo

   install : tipm/monglo@master
       dep : tipm/events@master
   install : tipm/events@master
     fetch : tipm/monglo:index.js
     fetch : tipm/monglo:fs-store.js
     fetch : tipm/events:index.js
  complete : tipm/monglo
  complete : tipm/events
```

## Searching for module

  By adding your tipm module to the [TIPM List](https://github.com/tipm/tipm/wiki/Modules) wiki page it will become automatically available to `tipm-search(1)`. When invoked with no query all tipm modules are displayed, otherwise a filtered search, ordered by the number of github "stars":

```
$ tipm search ui

  tipm/dialog
  url: https://github.com/tipm/dialog
  desc: Dialog module
  ★ 12

  tipm/notification
  url: https://github.com/tipm/notification
  desc: Notification module
  ★ 10

  tipm/overlay
  url: https://github.com/tipm/overlay
  desc: Overlay module
  ★ 7

```

## Usage

 Via `--help`:

```

Usage: tipm <command> [options]

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Commands:

  install <name ...>      install one or more tipm modules
  create <dir>            create a module skeleton
  search [query]          search with the given query
  convert <file ...>      convert view files to js modules
  info <name> [prop]      output json module information
  changes <name>          output changelog contents
  docs <name>             output readme contents
  open <name>             open module github repo
  build                   build the module
  ls                      list installed tipm modules

```

## Features

  - write modular commonjs modules
  - write modules that include their own styles, images, scripts, or any combo
  - no registry publishing or account required, uses github repositories
  - extensible sub-commands via `tipm-YOURCOMMAND` git-style
  - module skeleton creation command
  - installs dependencies from the command-line or ./package.json
  - avoid name squatting through github's naming conventions
  - build your module with `--standalone` to share them with non-tipm(1) users
  - view documentation from the command line
  - simple private registry set up (all you need is a file server)
  - very fast

## Using Github as a registry

  By using GitHub as the registry, `tipm(1)` is automatically
  available to you without further explicit knowledge or work
  creating a registry account etc.

  A nice side-effect of this namespaced world is that dependencies
  are explicit and self-documenting. No longer do you need to query
  the registry for a "repo" property that may not exist, it's simply
  built in to the package name, for example ["visionmedia/page.js"](https://github.com/visionmedia/page.js) rather
  than the unclear "page".

  Another benefit of this is that there are zero name collisions, for example
  you may use "tipm/tip" for a dependency of "foo", and "someuser/tip"
  as a dependency of "bar", providing namespaced module names. This prevents
  obscure or irrelevant naming such as "progress", "progress2", "progress-bar",
  "progress-module" found in npm.

## Creating a tipm Module

  The `tipm-create(1)` command can create a module
  project skeleton for you by filling out the prompts. Once
  this repo is published to Github, you're all done!

```
$ tipm create tester
repo (username/project): tipm/tester
description: Some example module
version:(0.0.1) 0.1.0
author name: Christian Sullivan
license type:(MIT) MIT
minimum Ti SDK version: 2.1.0

      create : tester/0.1.0
      create : tester/0.1.0/index.js
      create : tester/0.1.0/Readme.md
      create : tester/0.1.0/.gitignore
      create : tester/0.1.0/package.json

```


## Templates

  Because `tipm(1)` has no notion of a "template", even simple view files
  should be converted to a `require()`-able module. It is recommended that public
  modules shared within the community use regular ax-view templates, and regular
  ax-stylesheets to maximize contributions, however if you wish to use alternate
  technologies just make sure to compile them before publishing them to Github.

  For the recommended use-case of regular ax-view, the `tipm-convert(1)` command
  will translate a regular ax-view file to its `require()`-able JavaScript counterpart.

## Developing tipm(1) sub-commands

  `tipm(1)` and sub-commands are structured much like `git(1)`,
  in that sub-commands are simply separate executables. For example
  `$ tipm info pkg` and `$ tipm-info pkg` are equivalent.

  Because of this you'll likely want `PATH="./bin:$PATH"` in your
  profile or session while developing tipm, otherwise `./bin/tipm`
  will have a hard time finding the sub-commands.

## Running tests

Make sure dependencies are installed:

```
$ npm install
```

Then run:

```
$ make test
```

# TODO
  - Compile native modules
  - Integrate view templates (ax-view)
  - Integrate stylesheet templates (ax-style)

## Shout-outs

  The concept of tipm themselves are nothing new, Drupal
  for example has been doing this for years, however it seemed the concept was never
  really translated to the client. My hope is that other communities will re-implement this
  simple tool in their language of choice so that we can all consume components
  easily.

## Credits

tipm is based on port of [TJ Holowaychuk](https://github.com/visionmedia) [Component](https://github.com/component/component) for titanium apps


## Components Contributors

  - TJ Holowaychuk
  - Guillermo Rauch
  - Garrett Johnson
  - Amir Abu Shareb
  - Adam Sanderson
  - Matt Mueller
  - Forbes Lindesay
  - Arpad Borsos
  - Dan Williams

## License

(The MIT License)

Copyright (c) 2012 Christian Sullivan &lt;cs@euforic.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.