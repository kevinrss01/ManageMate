import { param, validationResult } from "express-validator";

export function validateAddFileBody(req, res, next) {
  const { userId } = req.body;
  console.log(req.body);

  // Manually validate userId
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Invalid userId." });
  }

  // Check if file is provided
  if (!req.file) {
    return res.status(400).json({ error: "No file provided." });
  }

  next();
}

export function validateDeleteFileBody(req, res, next) {
  const rules = [
    param("userId").notEmpty().isString(),
    param("fileId").notEmpty().isString(),
  ];

  Promise.all(rules.map((validation) => validation.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0] });
    }

    next();
  });
}
