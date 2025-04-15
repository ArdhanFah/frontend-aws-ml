import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    umur: '',
    bmi: '',
    glukosa: '',
    insulin: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/predictions`, {
        data: [
          parseFloat(formData.umur),
          parseFloat(formData.bmi),
          parseFloat(formData.glukosa),
          parseFloat(formData.insulin)
        ]
      });
      setPrediction(response.data);
    } catch (err) {
      console.error('Error saat memanggil API:', err);
      setError('Gagal memproses prediksi. Pastikan API aktif.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Prediksi Machine Learning</h1>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Umur:</label>
        <input 
          name="umur" 
          type="number" 
          placeholder="Masukkan umur" 
          value={formData.umur} 
          onChange={handleChange} 
          style={styles.input} 
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>BMI:</label>
        <input 
          name="bmi" 
          type="number" 
          placeholder="Masukkan BMI" 
          value={formData.bmi} 
          onChange={handleChange} 
          style={styles.input} 
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Glukosa:</label>
        <input 
          name="glukosa" 
          type="number" 
          placeholder="Masukkan kadar glukosa" 
          value={formData.glukosa} 
          onChange={handleChange} 
          style={styles.input} 
        />
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Insulin:</label>
        <input 
          name="insulin" 
          type="number" 
          placeholder="Masukkan kadar insulin" 
          value={formData.insulin} 
          onChange={handleChange} 
          style={styles.input} 
        />
      </div>
      
      <button 
        onClick={handlePredict} 
        disabled={loading || !formData.umur || !formData.bmi || !formData.glukosa || !formData.insulin}
        style={styles.button}
      >
        {loading ? 'Memproses...' : 'Prediksi'}
      </button>

      {error && <p style={styles.error}>{error}</p>}
      
      {prediction && (
        <div style={styles.result}>
          <p><strong>Hasil Prediksi:</strong> {prediction.result}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '1rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '16px',
    marginTop: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  result: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#e9f7e9',
    border: '1px solid #d3e7d3',
    borderRadius: '4px',
    textAlign: 'center',
  }
};

export default App;
