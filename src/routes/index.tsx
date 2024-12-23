import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import HeirInput from '@/pages/HeirInput';
import FinancialDetails from '@/pages/FinancialDetails';
import Results from '@/pages/Results';
import Education from '@/pages/Education';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/heirs" element={<HeirInput />} />
        <Route path="/financial" element={<FinancialDetails />} />
        <Route path="/results" element={<Results />} />
        <Route path="/education" element={<Education />} />
      </Route>
    </Routes>
  );
}