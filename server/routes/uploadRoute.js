import express from 'express'
const router = express.Router()
import multer from 'multer'

//For storing file at server
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.jpg')
      },
  });
const upload = multer({ storage });


router.post("/", upload.single("file"), (req, res) => {
    try {
       
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

export default router;