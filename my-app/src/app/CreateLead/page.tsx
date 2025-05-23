"use client";
import { useEffect, useState } from "react";
import DynamicForm from "./_component/DynamicForm";
import styled from "styled-components";


export type DropdownOption = { value: string; label: string };
export type FieldSchema = {
  id: number;
  type: string;
  label: string;
  name: string;
  value: string | number | boolean | string[] | undefined;
  options?: string[] | DropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  validation?: {
    regex?: string;
    min_length?: number;
    max_length?: number;
  };
  is_required?: boolean;
  is_enable?: boolean;
  is_show?:boolean;
  field_show?: string;
    parent_depedencies?:string;
  child_depedencies?:Array<string>;
};



const Wrapper = styled.div`
  padding: 2rem;
`;

const Navbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ $active }) => ($active ? "#2563eb" : "#e5e7eb")};
  color: ${({ $active }) => ($active ? "white" : "black")};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? "#1d4ed8" : "#d1d5db")};
  }
`;


const TAB_NAMES = ["Application", "Addon", "Quote", "Docs", "Customer"];

async function getFormStructure(): Promise<FieldSchema[][]> {
  const res = await fetch(
    "https://pre-api-id.oto.com/insurancebox//common/getFormFields",
    {
      method: "POST",
      headers: {
        apiKey: "agentbox-ac1faa7b-9fe9-4483-9525-5cc4ce94c639",
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      body: JSON.stringify({ formType: "lead" }),
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  const data = await res.json();
  type InsuranceFormSection = {
    blocks: { fields: FieldSchema[] }[];
  };
  return data.data.insuranceFormFields.map(
    (section: InsuranceFormSection) => section.blocks[0]?.fields || []
  );
}

async function getDropdownOptions(): Promise<Record<string, DropdownOption[]>> {
  const res = await fetch(
    "https://int-gcloud-stage.oto.com/insurancebox//common/master/config",
    {
      method: "GET",
      headers: {
        apiKey: "agentbox-ac1faa7b-9fe9-4483-9525-5cc4ce94c639",
        "Content-Type": "application/json",
        app_type: "id",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch options: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data || {};
}

export default function Page() {
  const [schemas, setSchemas] = useState<FieldSchema[][]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [formStructure, dropdownOptionsMap] = await Promise.all([
          getFormStructure(),
          getDropdownOptions(),
        ]);

        // Merge options into form fields safely
        const enrichedSchemas = formStructure.map(    (section) =>
          section
          .filter((field) => field.name !== "vehicle")
          .map((field) => {
            
            const matchingOptions = dropdownOptionsMap[field.name];

            return {
              ...field,
              options:
                Array.isArray(matchingOptions) &&
                  matchingOptions.every(
                    (opt) =>
                      typeof opt === "object" &&
                      "value" in opt &&
                      "label" in opt
                  )
                  ? matchingOptions
                  : field.options || [],
            };
          })
        );

        setSchemas(enrichedSchemas);
      } catch (err) {
        console.error("Error fetching form or options", err);
      }
    };

    fetchAllData();
  }, []);
  return (
    <Wrapper>
      <Navbar>
        {TAB_NAMES.map((name, index) => (
          <TabButton
            key={name}
            $active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {name}
          </TabButton>
        ))}
      </Navbar>

      <div className="text-xl font-bold mb-4">{TAB_NAMES[activeTab]} Details</div>
        
      <DynamicForm schema={schemas[activeTab] || []} />
    </Wrapper>
  );
}
