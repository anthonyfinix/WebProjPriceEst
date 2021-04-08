const getGodaddyPrice = require("./getGodaddyPrice");
module.exports = async (req, res) => {
  let prices = {
    goDaddy: await getGodaddyPrice(req.query.domain),
  };
  res.json({ prices });
};
