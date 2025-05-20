import React, { useState } from 'react';
// const converter = require('json-2-csv');
import * as converter from 'json-2-csv';

const JsonToCsvConverter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
const handleConvert = async () => {
  setError('');
  let parsed;

  try {
    parsed = JSON.parse(jsonInput);
  } catch (err) {
    console.log('JSON parsing error:', err);
    setError('Invalid JSON syntax.');
    return;
  }

  if (!Array.isArray(parsed)) {
    setError('JSON must be an array of objects.');
    return;
  }

  try {
    const csv =  converter.json2csv(parsed);


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    link.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('CSV conversion error:', err);
    setError('Failed to convert to CSV. See console for details.');
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">JSON to CSV Converter</h2>
      <textarea
        className="w-full h-60 p-2 border rounded resize-none font-mono text-sm"
        placeholder='Paste your JSON array here, e.g. [{"name": "John", "age": 30}]'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleConvert}
      >
        Convert & Download CSV
      </button>
    </div>
  );
};

export default JsonToCsvConverter;
