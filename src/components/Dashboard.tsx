import React, { useEffect, useState } from 'react';
import type { EmailSummary, Category } from '../types';
import { emailService } from '../services/api';
import EmailCard from './EmailCard';
import FilterBar from './FilterBar';
import '../styles/App.css';

const Dashboard: React.FC = () => {
  const [summaries, setSummaries] = useState<EmailSummary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await emailService.getAllSummaries();
      setSummaries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data. Please check if backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTriggerAI = async () => {
    try {
      setLoading(true);
      await emailService.processEmails(); 
      await loadData(); 
      alert("AI Processing Complete! Data saved to Neon DB.");
    } catch (error: any) {
      console.error("AI Error:", error);
      alert("AI Processing failed! Check OpenAI API Key or Server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this summary?")) {
      try {
        await emailService.deleteSummary(id);
        setSummaries(summaries.filter(s => s.id !== id));
      } catch (error) {
        alert("Delete failed! Backend error.");
      }
    }
  };

 
  const filteredSummaries = selectedCategory === 'All' 
    ? summaries 
    : summaries.filter(s => s.category === selectedCategory);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Email AI Summarizer</h1>
        <div className="header-actions">
          <button 
            onClick={handleTriggerAI} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "AI Processing..." : "Trigger AI Workflow"}
          </button>
        </div>
      </header>

      
      <FilterBar 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      <div className="email-list">
        {loading && summaries.length === 0 ? (
          <p className="status-message">Connecting to Neon Database...</p>
        ) : filteredSummaries.length > 0 ? (
          filteredSummaries.map(item => (
            <EmailCard 
              key={item.id} 
              data={item} 
              onDelete={handleDelete} 
            />
          ))
        ) : (
          <div className="no-data">
            <p>No summaries found in the database.</p>
            {!loading && (
              <button onClick={handleTriggerAI} className="btn-secondary">
                Generate First Summary
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;