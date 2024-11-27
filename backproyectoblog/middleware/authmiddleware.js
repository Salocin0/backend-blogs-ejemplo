import jwt from "jsonwebtoken";

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  console.log(token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_ACCESS, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
