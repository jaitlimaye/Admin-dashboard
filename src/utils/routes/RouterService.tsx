import {Routes, Route } from "react-router";
import { LoginPage,RegisterPage,Home } from "../../pages";
export const RouterService = () => {
    const ROUTES = [{path :"/" ,element:<LoginPage />},
        {path :"/login", element:<LoginPage />},
        {path :"/register", element:<RegisterPage />},
        {path :"/home", element:<Home />},
    ];

    return (
        <>
        <Routes>
            {ROUTES.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
        </>
    )
}