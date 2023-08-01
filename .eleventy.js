const tailwind = require('tailwindcss');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const postcssFilter = (cssCode, done) => {
  postcss([
    tailwind(require('./tailwind.config.js')),
    autoprefixer(),
    cssnano({ preset: 'default' })
  ])
    .process(cssCode, {
      from: './src/css/tailwind.css'
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
  );
};

module.exports = function (config) {
  config.addWatchTarget('./src/css/tailwind.css');
  config.addWatchTarget('./src/layouts/*.njk');
  config.addNunjucksAsyncFilter('postcss', postcssFilter);
  config.addPassthroughCopy('images')
  return {
    markdownTemplateEngine: "njk", 
    passthroughFileCopy: true,
    dir: {
      input: "src",
      data: "data",
      includes: "includes",
      layouts: "layouts",
      output: "_site"
    }
  }
}