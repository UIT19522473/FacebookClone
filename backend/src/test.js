const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
// Set the region 
AWS.config.update({ region: "ap-southeast-1", });

const app = express();


// Create S3 service object
const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'phucnvh',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
})

app.post('/upload', upload.array('img', 3), function (req, res, next) {
    console.log(req.files.location);
    res.send('Successfully uploaded ' + req.files.length + ' files!')
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
