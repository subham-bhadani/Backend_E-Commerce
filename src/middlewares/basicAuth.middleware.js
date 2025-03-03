import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    res.status(401).send("No Authorization header found");
    return;
  }

  console.log(authHeader, "-------auth header");

  const base64Credentials = authHeader.replace("Basic ", "");
  console.log(base64Credentials, "-------base64Credentials");

  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  console.log(decodedCredentials, "-------decodedCredentials");

  const creds = decodedCredentials.split(":");
  console.log(creds, "-------creds");

  const user = UserModel.getAllUser().find(
    (u) => u.email === creds[0] && u.password === creds[1]
  );

  if (user) {
    next();
  } else {
    res.status(401).send("Invalid credentials");
  }
};

export default basicAuthorizer;
