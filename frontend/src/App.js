import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure this file exists and is named correctly

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('https://your-backend-url/api/bfhl', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or request failed');
    }
  };

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = {};

    if (selectedOptions.includes('alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('highest_alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SRM123456</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='Enter JSON here'
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        {response && (
          <>
            <select multiple onChange={handleSelectChange}>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
            {renderResponse()}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
