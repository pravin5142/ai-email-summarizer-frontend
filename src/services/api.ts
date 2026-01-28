import axios from 'axios';
import type { EmailSummary } from '../types';

const API_BASE_URL = 'http://localhost:3000'; 

export const emailService = {
  getAllSummaries: async (): Promise<EmailSummary[]> => {
    const response = await axios.get(`${API_BASE_URL}/summaries`);
    return response.data;
  },

  processEmails: async (): Promise<void> => {
    await axios.get(`${API_BASE_URL}/summarize-emails`);
  },

  deleteSummary: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/summaries/${id}`);
  }
};