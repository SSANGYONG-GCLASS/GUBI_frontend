import Index from "../pages/index/Index";
import Cart from "../pages/carts/Cart";


export const userRoutes = [
    // 관리자 페이지 이외 ROUTE 설정
    {path: '/', element: <Index />},
    {path: '/carts', element: <Cart />}
];