const { Router } = require("express");
const ClientRoutes = require("./customer.route");
const showroomRoutes = require("./showroom.route");
const productRoutes = require("./product.route");
const userRoutes = require("./user.route");
const addressRoutes = require("./address.route");
const customerRoutes = require("./customer.route");
const expenseRoutes = require("./expense.route");
const expenseCategoryRoutes = require("./expense.route");

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
    path: "/showrooms",
    route: showroomRoutes,
  },
  {
    path: "/addresses",
    route: addressRoutes,
  },
  {
    path: "/customers",
    route: customerRoutes,
  },
  {
    path: "/expenses",
    route: expenseRoutes,
  },
  {
    path: "/expense-categories",
    route: expenseCategoryRoutes,
  },
];

routes.forEach((route) => router.use(route?.path, route?.route));

module.exports = router;
