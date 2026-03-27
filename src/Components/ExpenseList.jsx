import React from 'react';
import { t } from '../utils/i18n';

const ExpenseList = ({ expenses, onDelete, language = 'en' }) => {
  if (!expenses?.length) {
    return <div className="muted">{t(language, 'noExpenses')}</div>;
  }

  return (
    <div className="expense-list">
      <div className="expense-list__header">
        <span>{t(language, 'titleLabel')}</span>
        <span>{t(language, 'categoryLabel')}</span>
        <span>{t(language, 'amountLabel')}</span>
        <span>{t(language, 'dateLabel')}</span>
        <span>{t(language, 'action')}</span>
      </div>
      {expenses.map((exp) => (
        <div key={exp.id} className="expense-list__row">
          <span>{exp.title}</span>
          <span>{exp.category}</span>
          <span>${exp.amount.toFixed(2)}</span>
          <span>{exp.date}</span>
          <button className="text-btn danger" type="button" onClick={() => onDelete(exp.id)}>
            {t(language, 'deleteAction')}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
