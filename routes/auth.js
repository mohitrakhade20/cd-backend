var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);
// Upload Endpoint
router.post('/upload', (req, res) => {
  // console.log("Req>>> : ",req)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv('./uploads/' + file.name, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    // console.log("Res>>> : ",res)
    res.json({message:"File uploaded success", fileName: file.name});
  });
});
//uploading file route
// router.post("/upload",(req,res,next)=>{
//   console.log("Req ",req)
//   try {
//     if(!req.files) {
//         res.send({
//             status: false,
//             message: 'Error: No file uploaded',
//             req:req
//         });
//     }
//  else{ let uploadedFile = req.files.uploadedFile;
//   uploadedFile.mv('./uploads/' + uploadedFile.name);
// // console.log("uploaded files yess--- ",req);
// res.send({
//   success:true,
//   message:"File uploaded success",
//   data: {
//     name: uploadedFile.name,
//     mimetype: uploadedFile.mimetype,
//     size: uploadedFile.size
//   }
// });
// }
// } catch (err) {
//         res.json({Error: "Error while uploading file."})
//     }
// });

router.get("/signout", signout);

module.exports = router;
