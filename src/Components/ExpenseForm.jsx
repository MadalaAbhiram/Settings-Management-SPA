import React, { useState } from 'react';
import { t } from '../utils/i18n';

const initialForm = {
  title: '',
  amount: '',
  category: '',
  date: '',
};

const ExpenseForm = ({ onAdd, currentUser, language = 'en' }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser || !form.title || !form.amount) return;

    const expense = {
      id: Date.now(),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category.trim() || 'General',
      date: form.date || new Date().toISOString().split('T')[0],
      userId: currentUser.id,
    };

    onAdd(expense);
    setForm(initialForm);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">{t(language, 'titleLabel')}</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={t(language, 'titlePlaceholder')}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="amount">{t(language, 'amountLabel')}</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder={t(language, 'amountPlaceholder')}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="category">{t(language, 'categoryLabel')}</label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder={t(language, 'categoryPlaceholder')}
        />
      </div>

      <div className="form-row">
        <label htmlFor="date">{t(language, 'dateLabel')}</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          placeholder={t(language, 'datePlaceholder')}
        />
      </div>

      <button className="primary-btn" type="submit">
        {t(language, 'addExpenseButton')}
      </button>
    </form>
  );
};

export default ExpenseForm;
