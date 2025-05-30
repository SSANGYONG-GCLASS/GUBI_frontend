import Index from "../pages/index/Index";
import Cart from "../pages/carts/Cart";
import Checkout from "../pages/orders/Checkout";
import CheckoutResult from "../pages/orders/CheckoutResult";


export const userRoutes = [
    // 관리자 페이지 이외 ROUTE 설정
    {path: '/', element: <Index />},
    {path: '/carts', element: <Cart />},
    {path: '/checkout', element: <Checkout />},
    {path: '/checkout-result', element: <CheckoutResult />}
];