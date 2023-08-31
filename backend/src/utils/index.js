const _ = require("lodash");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

// Create S3 service object
AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "phucnvh",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      console.log("metadata", file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log("key", file);
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

///test-----------
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("metadata", file);
//     cb(null, "uploads/"); // Đường dẫn lưu trữ tệp
//   },
//   filename: function (req, file, cb) {
//     console.log("key", file);
//     cb(null, file.originalname); // Giữ tên gốc của tệp
//   },
// });
// const uploadTest = multer({ storage: storage });
module.exports = {
  getInfoData,
  upload,
};
