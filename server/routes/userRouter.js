const router = require("express").Router();
const userController = require("../controllers/userController");
const courseController = require("../controllers/courseController");

router.post("/sign-in",userController.signIn);
router.post("/sign-in/google",userController.signInGoogle);
router.get("/get/course",courseController.getCourse)

module.exports = router;
