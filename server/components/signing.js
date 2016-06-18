'use strict';
const aws = require('aws-sdk');
const config = require('../config/environment');

module.exports = function(req, res) {
  aws.config.update({accessKeyId: config.aws.access, secretAccessKey: config.aws.secret });
  aws.config.update({region: config.aws.region, signatureVersion: 'v4' });
  let s3 = new aws.S3(); 
  let file_name = `${(new Date()).getTime()}_${req.query.file_name}`;
  let s3_params = { 
    Bucket: config.aws.bucket, 
    Key: `${req.query.folder_name}/${file_name}`, 
    Expires: 60, 
    ContentType: req.query.file_type, 
    ACL: 'public-read'
  }; 

  s3.getSignedUrl('putObject', s3_params, function(err, data) { 
    if (err) { 
      console.log(err); 
    }
    else { 
      let return_data = {
        signed_request: data,
        url: file_name
      };
      res.send(return_data);
    } 
  });
}

