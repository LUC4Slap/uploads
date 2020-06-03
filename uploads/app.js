const express = require("express");
const boryParser = require("body-parser");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const mail = require("./email/index");
const auth = require("./middlewares/auth");

const Users = require("./models/Users");
const connection = require("./database/database");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão estabelecida com sucesso: arquivo -> index.js");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static("public"));
app.use(boryParser.urlencoded({ extended: true }));
app.use(boryParser.json());
app.set("view engine", "ejs");
// Session
app.use(
  session({
    secret: "sndflknsafkskjqweijwliejr",
    cookie: {
      maxAge: 30000000,
    },
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/uploads",auth, (req, res) => {
  res.render("uploads");
});

app.post("/create",auth, (req, res) => {
  let { nome, usuario, senha, senha_original } = req.body;
  Users.create({ nome, usuario, senha, senha_original })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/authenticate", (req, res) => {
  let { email, senha } = req.body;
  Users.findOne({ where: { usuario: email } }).then((user) => {
    if (user.senha === senha) {
      req.session.user = {
        id: user.id,
        email: user.email,
      };
      res.redirect("/uploads");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/home",auth, (req, res) => {
  fs.readdir("./uploads", (err, paths) => {
    res.render("home", { arquivos: paths });
  });
});

app.post("/upload",auth, upload.single("file"), async (req, res) => {
  res.redirect("home");
  await mail();
});

app.get("/sair", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

app.listen(3000, () => console.log("ON"));
