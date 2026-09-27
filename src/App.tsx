import { Route, Routes } from "react-router-dom";
import PageShell from "./components/layout/PageShell";
import Overview from "./pages/Overview";
import CityWatch from "./pages/CityWatch";
import CityMemory from "./pages/CityMemory";
import Discoveries from "./pages/Discoveries";
import EarlyWarnings from "./pages/EarlyWarnings";
import Evidence from "./pages/Evidence";
import DataSources from "./pages/DataSources";
import Connect from "./pages/Connect";

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/city-watch" element={<CityWatch />} />
        <Route path="/city-memory" element={<CityMemory />} />
        <Route path="/discoveries" element={<Discoveries />} />
        <Route path="/early-warnings" element={<EarlyWarnings />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/data" element={<DataSources />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </PageShell>
  );
}
