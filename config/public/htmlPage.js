// Base configuration for our html page. We use react-helmet supported syntax
// for the values.
// @see https://github.com/nfl/react-helmet
export default {
  htmlAttributes: { lang: 'en' },

  titleTemplate: 'React, Universally - %s',

  defaultTitle: 'React, Universally',

  meta: [
    {
      name: 'description',
      content: 'A starter kit giving you the minimum requirements for a production ready universal react application.',
    },
    // Default content encoding.
    { name: 'charset', content: 'utf-8' },
    // @see http://bit.ly/2f8IaqJ
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    // This is important to signify your application is mobile responsive!
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Providing a theme color is good if you are doing a progressive
    // web application.
    { name: 'theme-color', content: '#2b2b2b' },
  ],

  links: [
    // When building a progressive web application you need to supply
    // a manifest.json as well as a variety of icon types. This can be
    // tricky. Luckily there is a service to help you with this.
    // http://realfavicongenerator.net/
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#00a9d9' },
    // Make sure you update your manifest.json to match your application.
    { rel: 'manifest', href: '/manifest.json' },
  ],

  scripts: [
    // Example:
    // { src: 'http://include.com/pathtojs.js', type: 'text/javascript' },
  ],

  // We use the polyfill.io service which provides the polyfills that a
  // client needs, which is far more optimal than the large output
  // generated by babel-polyfill.
  polyfillIO: {
    enabled: true,
    url: 'https://cdn.polyfill.io/v2/polyfill.min.js',
  },
};
