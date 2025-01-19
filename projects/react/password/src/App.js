import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [suggestedPassword, setSuggestedPassword] = useState('');

  const generatePassword = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = letters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
    evaluatePasswordStrength(generatedPassword);
  };

  const evaluatePasswordStrength = (password) => {
    let strength = 'Faible';
    if (password.length >= 12 && /[0-9]/.test(password) && /[!@#$%^&*()_+]/.test(password)) {
      strength = 'Fort';
    } else if (password.length >= 8) {
      strength = 'Moyenne';
    }
    setPasswordStrength(strength);
  };

  const evaluateInputPasswordStrength = () => {
    evaluatePasswordStrength(inputPassword);
    if (passwordStrength === 'Faible') {
      suggestImprovedPassword(inputPassword);
    }
  };

  const suggestImprovedPassword = (input) => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let newPassword = input;
    if (!/[0-9]/.test(input) && includeNumbers) {
      newPassword += '1';
    }
    if (!/[!@#$%^&*()_+]/.test(input) && includeSymbols) {
      newPassword += '!';
    }
    
    while (newPassword.length < 12) {
      newPassword += symbols[Math.floor(Math.random() * symbols.length)];
    }

    setSuggestedPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Mot de passe copié dans le presse-papier !');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Générateur de Mots de Passe</h1>
      <div style={styles.options}>
        <label>
          Longueur :
          <input
            type="number"
            value={length}
            min="4"
            max="32"
            onChange={(e) => setLength(Number(e.target.value))}
            style={styles.input}
          />
        </label>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            style={styles.checkbox}
          />
          Inclure des chiffres
        </label>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            style={styles.checkbox}
          />
          Inclure des symboles
        </label>
      </div>
      <button onClick={generatePassword} style={styles.button}>
        Générer le mot de passe
      </button>
      {password && (
        <div style={styles.result}>
          <p style={styles.password}>{password}</p>
          <p style={styles.strength}>Force du mot de passe : {passwordStrength}</p>
          <button onClick={copyToClipboard} style={styles.copyButton}>
            Copier
          </button>
        </div>
      )}

      <div style={styles.inputContainer}>
        <h2>Entrer votre mot de passe</h2>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={evaluateInputPasswordStrength} style={styles.button}>
          Vérifier la force
        </button>
        {passwordStrength && (
          <div>
            <p>Force de votre mot de passe : {passwordStrength}</p>
            {passwordStrength === 'Faible' && (
              <div>
                <p>Voici une suggestion pour un mot de passe plus fort :</p>
                <p style={styles.password}>{suggestedPassword}</p>
                <button onClick={copyToClipboard} style={styles.copyButton}>
                  Copier la suggestion
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#EFF3F5',
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: '450px',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  header: {
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
  },
  options: {
    margin: '20px 0',
    textAlign: 'left',
    fontSize: '16px',
  },
  checkboxLabel: {
    display: 'block',
    margin: '10px 0',
    fontSize: '14px',
    color: '#000000',
  },
  checkbox: {
    marginRight: '10px',
    color: '#000000',
  },
  input: {
    padding: '12px 15px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  button: {
    padding: '12px 18px',
    backgroundColor: '#284E7B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#1C263D',
  },
  result: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  password: {
    fontSize: '18px',
    fontWeight: 'bold',
    wordWrap: 'break-word',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  strength: {
    fontSize: '14px',
    marginTop: '10px',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginTop: '30px',
  },
  copyButton: {
    padding: '10px 15px',
    backgroundColor: '#ADD4F3',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
  },
};

export default PasswordGenerator;
