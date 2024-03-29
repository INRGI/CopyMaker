import { Route, Routes } from "react-router-dom";
import Layout from '../Layout';
import { lazy } from "react";

const Home = lazy(() => import("../../pages/Home"));
const FormPromo = lazy(() => import("../../components/FormPromo"));
const NotFound = lazy(() => import("../../pages/NotFound"));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:domainId" element={<FormPromo />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;