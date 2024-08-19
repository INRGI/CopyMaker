import { Route, Routes } from "react-router-dom";
import Layout from '../Layout';
import { lazy } from "react";

const Home = lazy(() => import("../../pages/Home"));
const DomainPage = lazy(() => import("../../pages/DomainPage"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const CsvPage = lazy(() => import("../../pages/CsvPage"));
const TopPage = lazy(() => import("../../pages/TopPage"));
const AutoPage = lazy(() => import("../../pages/AutoPage"));
const TutorialPage = lazy(() => import("../../pages/TutorialPage"));

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:domainId" element={<DomainPage />} />

                <Route path="/emailFilter" element={<CsvPage />} />
                <Route path="/top" element={<TopPage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/auto/:domainId" element={<AutoPage />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;