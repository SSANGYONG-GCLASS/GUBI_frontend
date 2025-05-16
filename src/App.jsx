import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App
