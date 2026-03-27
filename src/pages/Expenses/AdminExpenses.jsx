import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ExpenseSummary from '../../Components/ExpenseSummary';
import { SettingsContext } from '../../context/SettingsContext';
import { getLanguage, t } from '../../utils/i18n';
import '../../styles/expenses.css';

const AdminExpenses = () => {
  const { state, dispatch } = useContext(SettingsContext);
  const navigate = useNavigate();
  const language = getLanguage(state);

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!state.currentUser.isAdmin) {
    return <Navigate to="/expenses" replace />;
  }

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
          <h2>{t(language, 'adminOverview')}</h2>
        </div>
        <div className="expenses-header__actions">
          <button type="button" className="ghost-btn" onClick={() => navigate('/dashboard')}>
            {t(language, 'dashboard')}
          </button>
          <button type="button" className="ghost-btn danger" onClick={handleLogout}>
            {t(language, 'logout')}
          </button>
        </div>
      </header>

      <ExpenseSummary expenses={state.expenses || []} language={language} />

      <div className="expense-card">
        <h3>{t(language, 'allExpenses')}</h3>
        {state.users.map((user) => {
          const userExpenses = (state.expenses || []).filter((exp) => exp.userId === user.id);
          return (
            <div key={user.id} className="user-expense-group">
              <div className="user-expense-group__title">
                <strong>{user.name}</strong>
                <span className="muted">{user.email}</span>
              </div>
              {userExpenses.length === 0 ? (
                <p className="muted">{t(language, 'noExpenses')}</p>
              ) : (
                userExpenses.map((exp) => (
                  <div key={exp.id} className="expense-list__row compact">
                    <span>{exp.title}</span>
                    <span>{exp.category}</span>
                    <span>${Number(exp.amount).toFixed(2)}</span>
                    <span>{exp.date}</span>
                    <button
                      className="text-btn danger"
                      type="button"
                      onClick={() => handleDelete(exp.id)}
                    >
                      {t(language, 'deleteAction')}
                    </button>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminExpenses;
