
const withSass = require('@zeit/next-sass')

const withImages = require('next-images')
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css')

const withLess = require('@zeit/next-less')
const withVideos = require('next-videos')

module.exports = withVideos()

module.exports = withCSS(withLess(withImages(withSass({
  env: {
    ANY_ENV_KEY: "ANY_ENV_VARIABLE"
  }
}))));


/*
module.exports = withImages({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack', 'url-loader'],
      });

      return config;
    },
  })*/
module.exports = (withFonts(withImages()))
