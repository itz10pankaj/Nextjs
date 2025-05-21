"use client";

import { useEffect, useState } from "react";
import DynamicForm from "./_component/DynamicForm";
import styled from "styled-components";
import type { FieldSchema } from "./_component/DynamicForm";

const Wrapper = styled.div`
  padding: 2rem;
`;

const Navbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? "#2563eb" : "#e5e7eb")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "#1d4ed8" : "#d1d5db")};
  }
`;

const TAB_NAMES = ["Application", "Addon", "Quote", "Docs", "Customer"];

async function getData() {
  const res = await fetch('https://int-gcloud-stage.oto.com/insurancebox//common/getFormFields', {
    method: 'POST',
    headers: {
      'apiKey': 'agentbox-ac1faa7b-9fe9-4483-9525-5cc4ce94c639',
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    },
    body: JSON.stringify({ formType: 'lead' }),
    cache: 'no-store'
  });

  
  // const res = await fetch(`http://localhost:3000/api/form`, {
  //     cache: 'no-store',
  //   });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
  const data= await res.json();
  console.log("data.......",data)
  type InsuranceFormSection = {
    blocks: { fields: FieldSchema[] }[];
  };

  return data.data.insuranceFormFields.map((section: InsuranceFormSection) => section.blocks[0]?.fields || []);
}

export default function Page() {
  const [schemas, setSchemas] = useState<FieldSchema[][]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      console.log("All Schemas:", result);
      setSchemas(result);
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Navbar>
        {TAB_NAMES.map((name, index) => (
          <TabButton
            key={name}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {name}
          </TabButton>
        ))}
      </Navbar>

      <div className="text-xl font-bold mb-4">
        {TAB_NAMES[activeTab]} Details
      </div>

      <DynamicForm schema={schemas[activeTab] || []} />
    </Wrapper>
  );
}
