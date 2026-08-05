import React, { useState } from 'react';
import QuoteModal from './QuoteModal';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function QuoteWizard({ isOpen = true, onClose = () => {}, initialData }) {
  return <QuoteModal isOpen={isOpen} onClose={onClose} initialData={initialData} />;
}

