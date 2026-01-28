import React from 'react';
import Dashboard from './components/Dashboard';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;