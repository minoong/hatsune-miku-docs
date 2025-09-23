import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from '~/pages/home/home-page';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
