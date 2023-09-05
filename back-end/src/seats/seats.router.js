const router = require("express").Router({ mergeParams: true });
const controller = require("./seats.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;