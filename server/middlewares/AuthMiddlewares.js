import { body, validationResult } from "express-validator";
import pkg, { decode } from "jsonwebtoken";
const { verify } = pkg;

export function validateRegisterBody(req, res, next) {
  const rules = [
    body("email").isEmail().notEmpty().isString(),
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("password").notEmpty().isLength({ min: 8 }).isString(),
    body("invoices").notEmpty().isArray({ min: 1 }),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0] });
    }

    next();
  });
}

export function validateLoginBody(req, res, next) {
  const rules = [
    body("email").isEmail().notEmpty().isString(),
    body("password").notEmpty().isString(),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(401)
        .json({ message: `Invalid body: ${errors.errors[0]}` });
    }

    next();
  });
}

export function validateUpdateAccountBody(req, res, next) {
  const rules = [
    body("userId").notEmpty().isString(),
    body("email").optional().isEmail().isString(),
    body("password").optional().isLength({ min: 8 }).isString(),
    body("firstName").optional().isString(),
    body("lastName").optional().isString(),
    body("invoices").optional().isArray({ min: 1 }),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.errors[0]);
      return res.status(400).json({ errors: errors.errors[0] });
    }

    next();
  });
}

export function validateUpdatePasswordBody(req, res, next) {
  const rules = [
    body("userId").notEmpty().isString(),
    body("password").notEmpty().isLength({ min: 8 }).isString(),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors.errors[0]);
      return res.status(400).json({ errors: errors.errors[0] });
    }

    next();
  });
}

export const validateToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (accessToken) {
      verify(accessToken, process.env.JWT_SECRET);
      next();
    } else {
      console.error("No access token found");
      res.status(401).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Access denied" });
  }
};

export const validateTokenAdmin = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (accessToken) {
      const decodedToken = verify(accessToken, process.env.JWT_SECRET);
      if (decodedToken?.role !== "admin") {
        console.error("Access denied for non-admin user");
        return res.status(401).json({ message: "Access denied" });
      }
      next();
    } else {
      console.error("No access token found");
      res.status(401).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Access denied" });
  }
};
