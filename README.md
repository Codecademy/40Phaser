# 40Phaser

![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)
[![Circle CI](https://img.shields.io/circleci/build/github/Codecademy/40Phaser.svg)](https://circleci.com/gh/Codecademy/40Phaser)
[![NPM version](https://badge.fury.io/js/40phaser.svg)](https://badge.fury.io/js/40phaser)
[![Powered by Phaser](https://img.shields.io/badge/powered%20by-phaser-blueviolet.svg)](https://phaser.io)

Codecademy's fancy schmancy 404 page.

## Usage

Install the `40phaser` package on npm:

```
npm i 40phaser
```

Because this package requires image assets, you'll need to use a bundler like [webpack](https://webpack.js.org) or [rollup](https://rollupjs.org/) to compile the script you use on your site. An example of this setup using rollup is included in this repo and used for local development.

In a webpage that already has [Phaser](https://phaser.io) available under `window.Phaser`, import and call the `launch40Phaser` function to start the game:

```js
import { launch40Phaser } from "40phaser";

window.onload = () => {
    launch40Phaser();
};
```

Alternately, if Phaser isn't available globally, you may pass it to the game as `phaser`:

```js
import { launch40Phaser } from "40phaser";
import phaser from "phaser";

window.onload = () => {
    launch40Phaser({ phaser });
};
```

### Events

An `on` object may be provided to the `launch40Phaser` object with functions under `end`, `game`, and `start` -- corresponding to those three Phaser scenes in the game.

```js
launch40Phaser({
    on: {
        game: action => console.log('[game]', action),   
    },
});
```

#### `on.end`

* `on.end("build-your-own")`: User navigates to the the Learn Phaser course
* `on.end("game")`: User restarts the game

#### `on.game`

* `on.game("death")`: User dies by falling through the floor
* `on.game("jump")`: User requests to jump
* `on.game("pause")`: User unpauses
* `on.game("unpause")`: User pauses

#### `on.start`

* `on.start("build-your-own")`: User navigates to the Learn Phaser course
* `on.start("contribute")`: User navigates to the GitHub repository
* `on.start("game")`: User starts the game

## Development

See [Development.md](./docs/Development.md)! ✨

### Contribution Guidelines

We'd love to have you contribute!
Check the [issue tracker](https://github.com/Codecademy/40Phaser/issues) for issues labeled [Accepting PRs](https://github.com/Codecademy/40Phaser/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Accepting+PRs%22) to find bug fixes and feature requests the community can work on.
If this is your first time working with this code, the [Good First issue](https://github.com/Codecademy/guidelines/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Good+First+Issue%22+) label indicates good introductory issues.

Please note that this project is released with a [Contributor Covenant](https://www.contributor-covenant.org).
By participating in this project you agree to abide by its terms.
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
