const aws = require('aws-sdk');
const config = require('../config/environment');

module.exports = function (req, res) {
  aws.config.update({ accessKeyId: config.aws.access, secretAccessKey: config.aws.secret });
  aws.config.update({ region: config.aws.region, signatureVersion: 'v4' });
  const s3 = new aws.S3();
  const fileName = `${(new Date()).getTime()}_${req.query.fileName}`;
  const params = {
    Bucket: config.aws.bucket,
    Key: `${req.query.folder_name}/${fileName}`,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      return res.status(400).send({ err });
    }
    const response = {
      signed_request: data,
      url: fileName,
    };
    return res.send(response);
  });
};

