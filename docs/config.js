const config = {
  'gatsby': {
    'pathPrefix': '/',
    'siteUrl': 'https://material-commons.dvkiin.xyz',
    'gaTrackingId': 'UA-40939202-5',
  },
  'header': {
    'logo': 'https://optioffer.com/wp-content/uploads/2019/10/android-chrome-512x512-1.png',
    'logoLink': '/',
    'title': '@dvkiin/material-commons',
    'githubUrl': 'https://github.com/bogdibota/material-commons',
    'helpUrl': '',
    'tweetText': '',
    'links': [
      { 'text': '', 'link': '' },
    ],
    'search': {
      'enabled': false,
      'indexName': '',
      'algoliaAppId': process.env.GATSBY_ALGOLIA_APP_ID,
      'algoliaSearchKey': process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      'algoliaAdminKey': process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  'sidebar': {
    'forcedNavOrder': [
      '/introduction',
      '/layout',
      '/components',
      '/validation',
      '/helpers',
    ],
    'links': [
      { 'text': 'OptiOffer', 'link': 'https://optioffer.com' },
      { 'text': 'Github', 'link': 'https://github.com/bogdibota/material-commons' },
      { 'text': 'Issues', 'link': 'https://github.com/bogdibota/material-commons/issues' },
    ],
    'frontline': false,
    'ignoreIndex': true,
  },
  'siteMetadata': {
    'title': 'Docs: @dvkiin/material-commons | OptiOffer',
    'description': 'Documentation and code examples for @dvkiin/material-commons lib. Powered by optioffer.com',
    'ogImage': null,
    'docsLocation': 'https://github.com/bogdibota/material-commons/tree/master/docs/content',
    'favicon': 'https://optioffer.com/wp-content/uploads/2019/10/cropped-Favicon-192x192.png',
  },
};

module.exports = config;
