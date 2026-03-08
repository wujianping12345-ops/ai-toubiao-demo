import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MembershipProvider } from './context/MembershipContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import InfoCollect from './pages/InfoCollect';
import OpportunityFind from './pages/OpportunityFind';
import PreLayout from './pages/PreLayout';
import PlanCustom from './pages/PlanCustom';
import DocGenerate from './pages/DocGenerate';
import Review from './pages/Review';

function App() {
  return (
    <BrowserRouter>
      <MembershipProvider>
        <Layout>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info-collect" element={<InfoCollect />} />
          <Route path="/opportunity-find" element={<OpportunityFind />} />
          <Route path="/pre-layout" element={<PreLayout />} />
          <Route path="/plan-custom" element={<PlanCustom />} />
          <Route path="/doc-generate" element={<DocGenerate />} />
          <Route path="/review" element={<Review />} />
        </Routes>
        </Layout>
      </MembershipProvider>
    </BrowserRouter>
  );
}

export default App;
