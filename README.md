# [Webnero UI]

## Building from Source Files

Use npm or yarn to install dependencies.

```
npm install gulp-nunjucks-render --save-dev
npm install gulp-data --save-dev
```

To update dependencies, run `bower update` and then run `gulp less && gulp deploy` to copy the updated dependencies

```
bower init
bower install
bower update
```

After cloning the repo take a look at the `gulpfile.js` and check out the tasks available:
* `gulp less` The less task will compile the LESS into the `dist` directory and minify the output.
* `gulp deploy` The default task will compile templates from NJK to HTML, and LESS and JS, then output into the `dist` directory and minify the output, and it will copy all vendor libraries from `bower_components` 

