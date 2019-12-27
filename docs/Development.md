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
