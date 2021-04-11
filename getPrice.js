const getGodaddyPrice = require("./getGodaddyPrice");
const getHostinger = require("./getHostinger");
module.exports = async (req, res) => {
  let prices = {
    goDaddy: await getGodaddyPrice(req.query.domain),
    hostinger: await getHostinger(req.query.domain),
  };
  res.json({ prices });
};
