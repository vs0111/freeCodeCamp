const { User, validate } = require("../model/userModel");
const bcrypt = require("bcrypt");

const userController = {
  signIn: async (req, res) => {
    try {
      const { error: registerError } = validate(req.body);

      if (registerError)
        return res
          .status(400)
          .send({ message: registerError.details[0].message });

      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser)
        return res.status(409).send({ message: "Email already exists!" });

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      // Register the user
      await new User({ ...req.body, password: hashPassword }).save();

      const user = await User.findOne({ email: req.body.email });
      const token = user.generateAuthToken();

      res.status(201).send({
        auth: true,
        user,
        token,
        message: "Registered and logged in successfully...",
      });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  },
  signInGoogle: async (req, res) => {
    console.log(req.body);
    try {
      const { email, name } = req.body;

      // Create a new document with the email and name
      const userData = new User({ email, name });

      // Save the data to the database
      await userData.save();
      const user = await User.findOne({ email: req.body.email });
      const token = user.generateAuthToken();

      res
        .status(201)
        .send({ auth: true, token, user, message: "Data stored successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = userController;
