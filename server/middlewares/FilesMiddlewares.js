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
