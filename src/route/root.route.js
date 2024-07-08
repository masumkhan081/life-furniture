const { Router } = require("express");
const ClientRoutes = require("./client.route");

const router = Router();

const routes = [
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/product",
    route: ClientRoutes,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

export const RootRoutes = router;
