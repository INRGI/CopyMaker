import { Route, Routes } from "react-router-dom";
import Layout from '../Layout';
import { lazy } from "react";

const Home = lazy(() => import("../../pages/Home"));
const DomainPage = lazy(() => import("../../pages/DomainPage"));
const NotFound = lazy(() => import("../../pages/NotFound"));

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:domainId" element={<DomainPage />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;