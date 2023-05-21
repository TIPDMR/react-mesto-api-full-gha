import {useState} from 'react';

function useValidation() {
  const [value, setValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [inputValid, setInputValid] = useState(false);

  const handleChange = (evt) => {
    setValue(evt.target.value);

    if (!evt.target.validity.valid) {
      setInputValid(false);
      setInputError(evt.target.validationMessage);
    } else {
      setInputValid(true);
      setInputError('');
    }
  };

  return {
    value,
    setValue,
    handleChange,
    inputError,
    setInputError,
    inputValid,
    setInputValid,
  };
}

export default useValidation;
