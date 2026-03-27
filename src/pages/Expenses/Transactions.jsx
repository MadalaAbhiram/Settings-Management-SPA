import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import { getLanguage, t } from '../../utils/i18n';
import '../../styles/expenses.css';

const Transactions = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const language = getLanguage(state);

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userExpenses = (state.expenses || []).filter(
    (exp) => exp.userId === state.currentUser.id,
  );

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="expenses-page">
      <header className="expenses-header">
        <div>
          <p className="muted">{t(language, 'expenseTrackerTitle')}</p>
          <h2>{t(language, 'transactionsLabel')}</h2>
        </div>
        <div className="expenses-header__actions">
          <button className="ghost-btn" type="button" onClick={() => navigate('/expenses')}>
            {t(language, 'backToDashboard')}
          </button>
          <button className="ghost-btn danger" type="button" onClick={handleLogout}>
            {t(language, 'logout')}
          </button>
        </div>
      </header>

      <div className="expense-card">
        <h3>{t(language, 'allTransactions')}</h3>
        {userExpenses.length === 0 ? (
          <p className="muted">{t(language, 'noTransactions')}</p>
        ) : (
          userExpenses.map((exp) => (
            <div key={exp.id} className="expense-list__row compact">
              <span>{exp.title}</span>
              <span>{exp.category}</span>
              <span>${Number(exp.amount).toFixed(2)}</span>
              <span>{exp.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
