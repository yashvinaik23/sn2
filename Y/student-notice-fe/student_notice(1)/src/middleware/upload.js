// const path = require('path');
const multer = require('multer');
const path = require('path');

// const upload = multer({
//   dest: 'uploads',
//   fileFilter: (req, file, callback) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return callback(new Error('Please Upload Image'));
//     } else {
//       console.log('Image Uploaded');
//     }
//     callback(undefined, true);
//   },
//   limits: {
//     fileSize: 100000000,
//   },
// });

// module.exports = upload;


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
module.exports = upload;