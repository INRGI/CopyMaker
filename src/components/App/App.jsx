import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from '../Layout';
import { lazy } from "react";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../../pages/Home"));
const DomainPage = lazy(() => import("../../pages/DomainPage"));
const NotFound = lazy(() => import("../../pages/NotFound"));
const CsvPage = lazy(() => import("../../pages/CsvPage"));
const TopPage = lazy(() => import("../../pages/TopPage"));
const AutoPage = lazy(() => import("../../pages/AutoPage"));
const TutorialPage = lazy(() => import("../../pages/TutorialPage"));

const DomainWrapper = () => {
    const { domainId } = useParams();
    const domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

    if (!domain) {
        return <Navigate to="/not-found" replace />;
    }

    return <DomainPage />;
};

const AutonWrapper = () => {
    const { domainId } = useParams();
    const domain = useSelector((state) =>
    state.domains.find((domain) => domain.id === domainId)
  );

    if (!domain) {
        return <Navigate to="/not-found" replace />;
    }

    return <AutoPage />;
};

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/:domainId" element={<DomainWrapper />} />

                <Route path="/emailFilter" element={<CsvPage />} />
                <Route path="/top" element={<TopPage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/auto/:domainId" element={<AutonWrapper />} />

                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
        </Routes>
    )
}

export default App;