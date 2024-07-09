const { Router } = require("express");
const ClientRoutes = require("./client.route");
const shopRoutes = require("./shop.route");
const productRoutes = require("./product.route");

const router = Router();

const routes = [
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/shop",
    route: shopRoutes,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
