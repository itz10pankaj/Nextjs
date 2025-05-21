import React, { useState } from 'react';
// const converter = require('json-2-csv');
import * as converter from 'json-2-csv';
import styled from 'styled-components';
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
const Wrapper = styled.div`
  max-width: 42rem; /* max-w-2xl */
  margin: 0 auto;   /* mx-auto */
  padding: 1.5rem;  /* p-6 */
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow */
  border-radius: 0.5rem; /* rounded */
`;
const Title = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;   /* font-semibold */
  margin-bottom: 1rem; /* mb-4 */
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 15rem;      /* h-60 */
  padding: 0.5rem;    /* p-2 */
  border: 1px solid #ccc;
  border-radius: 0.375rem; /* rounded */
  resize: none;
  font-family: monospace;
  font-size: 0.875rem; /* text-sm */
`;
const ErrorText = styled.p`
  color: #ef4444; /* text-red-500 */
  margin-top: 0.5rem;
`;
const Button = styled.button`
  margin-top: 1rem;       /* mt-4 */
  padding: 0.5rem 1rem;   /* px-4 py-2 */
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  border: none;
  border-radius: 0.375rem; /* rounded */
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8; /* hover:bg-blue-700 */
  }
`;

  return (
    <Wrapper>
      <Title>JSON to CSV Converter</Title>
      <TextArea
        placeholder='Paste your JSON array here, e.g. [{"name": "John", "age": 30}]'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        onClick={handleConvert}
      >
        Convert & Download CSV
      </Button>
    </Wrapper>
  );
};

export default JsonToCsvConverter;
