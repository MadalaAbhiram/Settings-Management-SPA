import { useState, useCallback } from 'react';

const useFormValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    if (validate) {
      const newErrors = validate({ ...values, [name]: values[name] });
      setErrors(newErrors || {});
    }
  }, [values, validate]);

  const handleSubmit = useCallback((callback) => (e) => {
    e.preventDefault();
    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors || {});
      if (!newErrors || Object.keys(newErrors).length === 0) {
        callback(values);
      }
    } else {
      callback(values);
    }
  }, [values, validate]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
  };
};

export default useFormValidation;