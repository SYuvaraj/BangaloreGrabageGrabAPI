/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	uploadFile: function (req, res) {
	    req.file('avatar').upload({
	      adapter: require('skipper-s3'),
	      key: 'AKIAJHPNFL44GBYZ4YGQ'
	      secret: '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'
	      bucket: 'appimagestore'
	    }, function (err, filesUploaded) {
	      if (err) return res.negotiate(err);
	      return res.ok({
	        files: uploadedFiles,
	        textParams: req.params.all()
	      });
	    });
	  }
 }};

