const express = require("express");
const router = express.Router();

//test chat private
router.use("/v1/api", require("./chatprivate/index"));
//test chat group
router.use("/v1/api", require("./chatgroup/index"));

//check permission
router.use("/v1/api", require("./access/index"));
router.use("/v1/api", require("./post/index"));
router.use("/v1/api", require("./comment/index"));

//tuan lam
router.use("/v1/api", require("./search/index"));

router.get("", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome",
  });
});

module.exports = router;
