const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (name == null || email == null || password == null || confirmPassword == null) {
    return res.status(400).json({ error: "Por favor, preencha todos os campos!" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "As senhas não conferem!" });
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res.status(400).json({ error: "O e-mail informado já está em uso!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  console.log(passwordHash);
});

module.exports = router;
