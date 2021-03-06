const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const connect = require('gulp-connect');
const Transform = require('readable-stream/transform');
const webpackConfig = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const open = require('gulp-open');
const argv = require('yargs').argv;

const port = 8001;

gulp.task('clean', (done) => {
  del(['www/**', '!www'])
    .then(() => {
      done();
    });
});

gulp.task('open-webpack-server-url', () => {
  gulp.src(__filename)
    .pipe(open({
      uri: `http://localhost:${port}/index.html`,
    }));
});

function configureEntryAndHtml(config, entryPaths) {
  config.entry = config.entry || {};
  Object.keys(entryPaths).map((key) => {
    const entryPath = entryPaths[key];
    // var jsKey = key + '/' + key.split('/').pop();
    if (entryPath.js) {
      config.entry[key] = path.join(__dirname, `/src/${key}`);
    }

    if (entryPath.html) {
      config.plugins = config.plugins.concat(
        new HtmlWebpackPlugin({
          template: `./src/${key}/index.html`,
          filename: `${key}.html`,
          inject: false,
          chunks: entryPath.js ? [key, 'theme'] : ['theme'],
        })
      );
    }
    return config;
  });
}

function getDevWebpackConfig(entryPaths) {
  const config = Object.create(webpackConfig);
  config.devtool = 'cheap-module-eval-source-map';
  configureEntryAndHtml(config, entryPaths);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(argv.env || 'development'),
      },
    })
  );
  return config;
}

function getBuildWebpackConfig(entryPaths) {
  const config = Object.create(webpackConfig);
  configureEntryAndHtml(config, entryPaths);
  // add contextPath for weblogic server
  config.output.publicPath = '/referral/';
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(argv.env || 'development'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
  return config;
}

gulp.task('webpack-dev-server', () => {
  const entryPaths = {};
  return gulp.src(['src/**/index.html', 'src/**/index.js'], { read: false })
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, callback) {
        const globPath = file.relative.replace('/index.html', '').replace('/index.js', '');
        entryPaths[globPath] = entryPaths[globPath] || {};
        const extname = file.relative.split('.').pop();
        if (extname === 'js') {
          entryPaths[globPath].js = true;
        } else if (extname === 'html') {
          entryPaths[globPath].html = true;
        }
        return callback(null, file);
      },
    }))
    .on('finish', () => {
      const config = getDevWebpackConfig(entryPaths);
      new WebpackDevServer(webpack(config), {
        inline: true,
        historyApiFallback: true,
        stats: {
          colors: true,
        },
      }).listen(port, '0.0.0.0', (err) => {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
      });
    });
});

gulp.task('build', () => {
  const entryPaths = {};
  return gulp.src(['src/**/index.html', 'src/**/index.js'], { read: false })
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, callback) {
        const globPath = file.relative.replace('/index.html', '').replace('/index.js', '');
        entryPaths[globPath] = entryPaths[globPath] || {};
        const extname = file.relative.split('.').pop();
        if (extname === 'js') {
          entryPaths[globPath].js = true;
        } else if (extname === 'html') {
          entryPaths[globPath].html = true;
        }
        return callback(null, file);
      },
    }))
    .on('finish', () => {
      const config = getBuildWebpackConfig(entryPaths);
      webpack(config, (err) => {
        if (err) throw new gutil.PluginError('webpack:build', err);
      });
    });
});

gulp.task('bundle', ['clean', 'build']);

gulp.task('default', ['webpack-dev-server', 'open-webpack-server-url']);
