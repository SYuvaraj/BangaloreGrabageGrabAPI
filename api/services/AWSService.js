var fs = require('fs');
var AWS = require('aws-sdk');
var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAJHPNFL44GBYZ4YGQ"; //old one AKIAIX2M43RZHUFYPSRA
var secretAccessKey = process.env.AWS_SECRET_KEY || "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"; //old one Enqw/kp21FeU1PFfH6BXOsx/c2D7xwGphHzBfZU1

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();

exports.upload = function(doc, cb) {
    // console.log(doc);
    doc.name = doc.name + "." + doc.ext;
    var bucket = process.env.AWS_S3_IMG_BUCKET || 'appimagestore'; //'marrily-dev'

    var uploader = function(params){
        s3.putObject(params, function (err, res) {
            if (err) {
                sails.log.error("Error uploading data: ", err);
                cb(err);
            } else {
                sails.log.debug("Successfully uploaded data to " + params.Bucket+ '/'+params.Key);
                cb(null, res);
            }
        });
    };

    // "/Images/Profile/"+
    if(doc.path){
        fs.readFile(doc.path, function(err, file_buffer){
            var params = {
                Bucket: bucket,
                Key:  doc.name,
                Body: file_buffer,
                ACL: 'public-read',
                ContentType: 'image/jpeg'
            };
            uploader(params);
        });
    }else{
        var params = {
                Bucket: bucket,
                Key: doc.name,
                Body: doc.primaryImage,
                ACL: 'public-read',
                ContentType: 'image/jpeg'
        };
        uploader(params);
    }
},

exports.delete = function(resource, cb){
    var bucket = process.env.AWS_S3_IMG_BUCKET || 'appimagestore'; //'marrily-dev'
    var params = {
        Bucket: bucket,
        Key: resource
    }
    s3.deleteObject(params, function(err, data){
        if(err)
            cb(err)
        else
            cb(null, data)
    });
}