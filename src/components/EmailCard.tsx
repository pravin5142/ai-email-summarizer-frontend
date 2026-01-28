import React from 'react';
import type { EmailSummary } from '../types';
import '../styles/EmailCard.css';

interface Props {
  data: EmailSummary;
  onDelete: (id: number) => void;
}

const EmailCard: React.FC<Props> = ({ data, onDelete }) => {
  return (
    <div className="email-card">
      <div className="card-content">
        <div className="sender-info">
          <span>From: {data.sender}</span>
        </div>
        
        <h3>{data.subject}</h3>
        
        <p className="summary-text">{data.summary}</p>
        
        <div className="card-footer">
          <span className="badge">
            {data.category}
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button 
          onClick={() => onDelete(data.id)} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmailCard;