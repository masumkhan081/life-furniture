const { Router } = require("express");
const ClientRoutes = require("./customer.route");
const shopRoutes = require("./shop.route");
const productRoutes = require("./product.route");
const userRoutes = require("./user.route");

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/shops",
    route: shopRoutes,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
