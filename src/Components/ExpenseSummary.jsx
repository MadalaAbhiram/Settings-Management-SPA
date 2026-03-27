import React from 'react';
import { t } from '../utils/i18n';

const ExpenseSummary = ({ expenses = [], language = 'en' }) => {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
  const average = expenses.length ? total / expenses.length : 0;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <p>{t(language, 'totalExpenses')}</p>
        <h3>${total.toFixed(2)}</h3>
      </div>
      <div className="summary-card">
        <p>{t(language, 'transactionsLabel')}</p>
        <h3>{expenses.length}</h3>
      </div>
      <div className="summary-card">
        <p>{t(language, 'average')}</p>
        <h3>${average.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ExpenseSummary;
