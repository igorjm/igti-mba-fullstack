import express from "express";
import basicAuth from "express-basic-auth";

const app = express();

app.use(
  basicAuth({
    authorizer: (username, password) => {
      // Comparação de usuario e senha a partir da DB
      const usernameMatches = basicAuth.safeCompare(username, "admin");
      const pwdMatches = basicAuth.safeCompare(password, "admin");

      const profUsernameMatches = basicAuth.safeCompare(username, "professor");
      const profPwdMatches = basicAuth.safeCompare(password, "1234");

      return (
        (usernameMatches && pwdMatches) ||
        (profUsernameMatches && profPwdMatches)
      );
    },
  })
);

// Função para buscar a role do usuario na DB
const getRole = (username) => username;

const authorize = (...allowed) => (req, res, next) => {
  const isAllowed = (role) => allowed.indexOf(role) > -1;
  if (req.auth.user) {
    const role = getRole(req.auth.user);
    if (isAllowed(role)) {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "User not identified " });
  }
};

// Rota "/findAll" aceita apenas admin
app.use("/findAll", authorize("admin"));
app.get("/findAll", (req, res) => res.send("API findAll :)"));

// Rota "/findOne" aceita apenas professor
app.use("/findOne", authorize("professor"));
app.get("/findOne", (req, res) => res.send("API findOne ;)"));

// Rota "/findWhatever" aceita ambos roles
app.use("/findWhatever", authorize("admin", "professor"));
app.get("/findWhatever", (req, res) => res.send("API findWhatever :p"));

app.listen(3333, () => console.log("server up"));
