# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and installing dependencies:

```
git clone https://github.com/<your-name-here>/40Phaser
cd 40Phaser
npm i
```

## Local Testing

Start a local http server using the provided VS Code [npm start task](https://code.visualstudio.com/docs/editor/tasks) or in your terminal:

```shell
npm run start
```

And in another terminal, start Rollup to compile your JavaScript files as you edit them:

```shell
npm run watch
```

Open [`http://127.0.0.1:8080/demo`](http://127.0.0.1:8080/demo) to start playing!
Any changes you make to source files will be visible when you refresh the browser page.

## Updating Versions

Our CircleCI builds will publish new versions as listed in `package.json`.
To update a version:

1. Create a new branch locally
2. Run [`npm version`](https://docs.npmjs.com/cli/version) to update `package.json` and `package-lock.json`
3. Send a pull request to `main` from that branch

Once that PR is merged, CircleCI will publish the new version.
Hooray!
