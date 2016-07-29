const _ = require('lodash');

const all = {
  aws: {
    access: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWS_SECRET_KEY,
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
  },
  facebook: {
    secret: process.env.FACEBOOK_SECRET,
    graphAPI: 'https://graph.facebook.com/v2.5',
    oauthUrl: 'https://graph.facebook.com/v2.5/oauth/access_token',
    graphUrl: 'https://graph.facebook.com/v2.5/me',
  },
  token: process.env.TOKEN_SECRET,
  host: process.env.HOST,
  port: process.env.PORT,
  mail: {
    smtp: process.env.SMTP_CONNECTION,
    registration: process.env.REGISTRATION_EMAIL,
    support: process.env.SUPPORT_EMAIL,
  },
};
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
