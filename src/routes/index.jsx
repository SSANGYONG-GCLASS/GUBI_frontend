import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";

export const routes = [...userRoutes, ...adminRoutes];