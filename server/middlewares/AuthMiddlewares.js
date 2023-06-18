import { body, validationResult } from "express-validator";
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
    body("password").notEmpty().isLength({ min: 8 }).isString(),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0] });
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
        return res.status(400).json({ errors: errors.errors[0] });
      }
  
      next();
    });
  }
