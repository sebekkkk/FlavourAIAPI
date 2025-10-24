export const isAdmin = (req, res, next) => {
  if (req.user.idAdmin === true) {
    next();
  } else {
    return res.status(403).json({ error: "Forbidden: Admin only" });
  }
}; 