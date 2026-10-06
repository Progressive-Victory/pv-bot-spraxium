# PV BOT SRAXIOM

This repository serves as the new home for the PV discord bot. It is currently in flux as we transition from the old [PV bot](https://github.com/Progressive-Victory/the-discord-bot) to this one. 

This bot supports operations in the Progressive Victory Discord Server. To join, sign up on the [website](https://www.progressivevictory.win/volunteer).

## High Level Overview

The Progressive Victory Discord bot runs in a [Docker](https://docs.docker.com/get-started/) container deployed to the [GCP Compute Engine](https://cloud.google.com/compute/docs/containers). The bot uses:

- [pnpm](https://pnpm.io/) to manage dependencies
- [MySQL](https://dev.mysql.com/doc/refman/8.4/en/)
- [express.js](https://expressjs.com/en/api.html) to implement RESTful APIs
  - **NOTE:** The bot now requires the api repo to be running concurrently to perform any interaction with the database. See the [api repo](https://github.com/Progressive-Victory/the-api) for instructions on how to set that up.
- [spraxium](https://spraxium.com/en) as a framework for the commands and features

This version of the bot adds in the [spraxium](https://spraxium.com/en) dependency, and transitions to using its forms and functions.


## Contributing

To contribute to this repo, follow the contribution standards and instructions outlined on the [project home page](https://github.com/Progressive-Victory).

Additionally, look at and read some of the [Spraxium Documentation](https://spraxium.com/en/guide/getting-started) for how the structure works and operates. Pay special attention to the [Slash Commands](https://spraxium.com/en/guide/slash-commands-overview) for how to structure any new commands you're making, and to the [Listeners](https://spraxium.com/en/guide/listeners-overview) for any background listener features (i.e. the logging of user joins etc).

Additionally, check out the example command in our src folder for how to organize your commands.

We are using modules per topic, as recommended by the spraxium docs.

## Setup Instructions

Currently this version of the bot is not yet tied to the API. It will be, and once it is things will change, but for the time being all you need to do to run the bot and to test it locally is to install `node`, `npm`, and `pnpm`.

We recommend you install the following software:

- [git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [Node.js](https://nodejs.org/en/download) v20.12.2 or later.


Follow the installation instructions for Node.js. Then, run the following:

```sh
npm install -g pnpm@latest-10
```

Finally, copy `./.env.sample` to a file `./.env` then edit the following vaules to be accurate:

```txt

# Discord bot token — https://discord.com/developers/applications
DISCORD_TOKEN= "<bot_token>"

```

You can ask a lead to provide these values.

### Running the Bot

First, install all dependencies:

```sh
pnpm install
```

Build and run the bot:

```sh
pnpm dev
```

If the bot fails to run, check that all values are correct in the `./.env` file. Otherwise, if everything succeeds, you should be able to send commands to the bot via the Dev Discord server.


## Modules

Modules group behaviour and capabilities together into topics. These topics are related by functionality. A single module can hold multiple commands or features.

### Example

This is the module for example commands and features. No production commands should go into this module. If we need an example for anything in particular you learned while working on the bot
for people coming after you, make sure to leave one in this module.

File: `src\modules\example\example.module.ts`

### YOUR MODULE HERE


## Commands

Commands are things that people can do my interacting with the bot. Any thing where you type something to the bot and expect to get a result back out would be a command. Currently there is only
the one command, which is done as an example of how to document your commands well. This is an important part of adding commands as well.

### Example

Currently exists as an example command for how to structure your own commands. It should allow input of 'Yours' or 'Mine' and return a comical message as a result to the sender.

The view is done via the file `src\modules\example\commands\example.command.ts`.
The command's action is handled by the file `src\modules\example\handlers\example-command.handler.ts`.

## Features

Currently there are none, but please document them as you add them. Features are things like logging of joins, interaction with the API, data being stored or moved somewhere. These are things
which happen automatically in the background of the bot without any human interaction.
