import Index from "../pages/index/Index";
import Cart from "../pages/carts/Cart";
import Checkout from "../pages/orders/Checkout";
import CheckoutResult from "../pages/orders/CheckoutResult";
import MemberOrders from "../pages/member/MemberOrders";
import Login from "../pages/users/Login";
import IdFind from "../pages/users/IdFind";
import IdFindEnd from "../pages/users/IdFindEnd"
import PasswordFind from "../pages/users/PasswordFind"
import PasswordUpdate from "../pages/users/PasswordUpdate"
import Register from "../pages/users/Register"
import MemberReactivation from "../pages/users/MemberReactivation"

export const userRoutes = [
    // 관리자 페이지 이외 ROUTE 설정
    {path: '/', element: <Index />},
    {path: '/carts', element: <Cart />},
    {path: '/checkout', element: <Checkout />},
    {path: '/checkout-result', element: <CheckoutResult />},
    {path: '/member/orders', element: <MemberOrders />},
    {path: '/login', element: <Login />},
    {path: '/idFind', element: <IdFind />},
    {path: '/idFindEnd', element: <IdFindEnd />},
    {path: '/passwordFind', element: <PasswordFind />},
    {path: '/passwordUpdate', element: <PasswordUpdate />},
    {path: '/register', element: <Register />},
    {path: '/memberReactivation', element: <MemberReactivation />}
];