function CorsMIddleware() {
  return (req, res, next) => {
    //  headers to allow  and help CORS
    res.header('Access-Control-Allow-Origin', '*'); //  change * to domain namen
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  };
}

module.exports = CorsMIddleware;
