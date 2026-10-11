export function errorHandler(err, _req, res, _next) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Already exists' });
  }
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
}
