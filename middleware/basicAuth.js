// Very small Basic Auth middleware for demo/testing.
// For production use HTTPS and a stronger auth mechanism.
const atob = (b64) => Buffer.from(b64, 'base64').toString('utf8');

module.exports = function (req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm=\"UserAPI\"');
    return res.status(401).json({ message: 'Missing Authorization header' });
  }
  try {
    const cred = atob(auth.split(' ')[1]);
    const [user, pass] = cred.split(':');
    const BASIC_USER = process.env.BASIC_USER || 'admin';
    const BASIC_PASS = process.env.BASIC_PASS || 'password';
    if (user === BASIC_USER && pass === BASIC_PASS) return next();
    res.setHeader('WWW-Authenticate', 'Basic realm=\"UserAPI\"');
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    return res.status(400).json({ message: 'Bad Authorization header' });
  }
};
