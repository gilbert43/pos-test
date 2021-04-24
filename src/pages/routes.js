import { routes as orderRoutes } from "./orders/routes";
import { routes as supRoutes } from "./suppliers/routes";
import { routes as productRoutes } from "./products/routes";

export const routes = [
    ...orderRoutes,
    ...supRoutes,
    ...productRoutes,
];
