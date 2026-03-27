import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ExpenseForm from '../../Components/ExpenseForm';
import ExpenseList from '../../Components/ExpenseList';
import ExpenseSummary from '../../Components/ExpenseSummary';
import { SettingsContext } from '../../context/SettingsContext';
import { getLanguage, t } from '../../utils/i18n';
import '../../styles/expenses.css';

const UserExpenses = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const language = getLanguage(state);

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userExpenses = (state.expenses || []).filter(
    (exp) => exp.userId === state.currentUser.id,
  );

  const handleAdd = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="expenses-page">
      <header className="expenses-header">
        <div>
          <p className="muted">{t(language, 'expenseTrackerTitle')}</p>
          <h2>{t(language, 'welcome')}, {state.currentUser.name}</h2>
        </div>
        <div className="expenses-header__actions">
          <button type="button" className="ghost-btn" onClick={() => navigate('/settings/general')}>
            {t(language, 'settingsTitle')}
          </button>
          <button type="button" className="ghost-btn" onClick={() => navigate('/transactions')}>
            {t(language, 'transactionsLabel')}
          </button>
          <button type="button" className="ghost-btn danger" onClick={handleLogout}>
            {t(language, 'logout')}
          </button>
        </div>
      </header>

      <ExpenseSummary expenses={userExpenses} language={language} />

      <div className="expense-grid">
        <div className="expense-card">
          <h3>{t(language, 'addExpense')}</h3>
          <ExpenseForm onAdd={handleAdd} currentUser={state.currentUser} language={language} />
        </div>
        <div className="expense-card">
          <h3>{t(language, 'recentExpenses')}</h3>
          <ExpenseList expenses={userExpenses} onDelete={handleDelete} language={language} />
        </div>
      </div>
    </div>
  );
};

export default UserExpenses;
