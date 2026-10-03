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

Additionally, check out the example command in our src folder for how to organize this. 
