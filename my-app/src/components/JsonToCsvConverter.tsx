'use client';

import React, { useState } from 'react';
// const converter = require('json-2-csv');
import * as converter from 'json-2-csv';
import styled from 'styled-components';
const Container = styled.div`
  max-width: 42rem; /* max-w-2xl */
  margin: 0 auto;   /* mx-auto */
  padding: 1.5rem;  /* p-6 */
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow */
  border-radius: 0.5rem; /* rounded */
`;
const Heading = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600;   /* font-semibold */
  margin-bottom: 1rem; /* mb-4 */
`;
const InputArea = styled.textarea`
  width: 100%;
  height: 15rem;      /* h-60 */
  padding: 0.5rem;    /* p-2 */
  border: 1px solid #ccc;
  border-radius: 0.375rem; /* rounded */
  resize: none;
  font-family: monospace;
  font-size: 0.875rem; /* text-sm */
`;
const ErrorMessage = styled.p`
  color: #ef4444; /* text-red-500 */
  margin-top: 0.5rem;
`;
const ConvertButton  = styled.button`
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
      // const converter = await import('json-2-csv'); 
      const csv =  converter.json2csv(parsed);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      link.click();
      URL.revokeObjectURL(url);
      setJsonInput('');
    } catch (err) {
      console.error('CSV conversion error:', err);
      setError('Failed to convert to CSV. See console for details.');
    }
  };

  return (
    <Container>
      <Heading>JSON to CSV Converter</Heading>
      <InputArea
        placeholder='Paste your JSON array here, e.g. [{"name": "John", "age": 30}]'
        value={jsonInput}
         onChange={(e) => setJsonInput(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ConvertButton 
        onClick={handleConvert}
      >
        Convert & Download CSV
      </ConvertButton>
    </Container>
  );
};

export default JsonToCsvConverter;
