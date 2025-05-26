"use client";
import { useEffect, useState, useRef } from "react";
import DynamicForm from "./_component/DynamicForm";
import styled from "styled-components";


export type DropdownOption = { value: string; label: string };

type FormSection = {
  blocks?: Array<{
    fields?: FieldSchema[];
  }>;
  btn?: {
    title?: string;
  };
};

type FormStructureResponse = {
  data: {
    insuranceFormFields: FormSection[];
  };
};

type generatedStructure = {
  fields: FieldSchema[];
  btnTitle?: string;
};

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
  is_show?: boolean;
  field_show?: string;
  parent_depedencies?: string;
  child_depedencies?: Array<string>;
  multiple?: number;
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

const TAB_NAMES = ["Application", "Docs",];
function isFormSection(section: unknown): section is FormSection {
  return typeof section === 'object' && section !== null;
}

async function getFormStructure(): Promise<generatedStructure[]> {
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
  const data: FormStructureResponse = await res.json();
  return data.data.insuranceFormFields.map((section) => {
    if (!isFormSection(section)) {
      console.warn('Invalid section structure', section);
      return { fields: [], btnTitle: "" };
    }
    return {
      fields: section.blocks?.[0]?.fields || [],
      btnTitle: section.btn?.title || "",
    };
  });
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
  const [btnTitles, setBtnTitles] = useState<string[]>([]);
  const [docsSchema, setDocsSchema] = useState<FieldSchema[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [formStructures, dropdownOptionsMap] = await Promise.all([
          getFormStructure(),
          getDropdownOptions(),
        ]);
        const schemaStructure = formStructures.map((section) => section.fields);

        const buttonTitles = formStructures.map((section) => {
          return section.btnTitle || "Submit";
        });
        setBtnTitles(buttonTitles);
        const enrichedSchemas = schemaStructure.map((section) =>
          section
            .filter((field) => field.name !== "vehicle")
            .map((field) => {

              const matchingOptions = dropdownOptionsMap[field.name];
              const validOptions = Array.isArray(matchingOptions) &&
                matchingOptions.every(opt =>
                  typeof opt === "object" &&
                  "value" in opt &&
                  "label" in opt
                );

              return {
                ...field,
                options: validOptions ? matchingOptions : field.options || [],
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
  //Teamproy local data for docs
  useEffect(() => {
    const loadDocsSchema = async () => {
      try {
        const res = await fetch("/docsSchema.json");
        const json: FieldSchema[] = await res.json();
        setDocsSchema(json);
      } catch (err) {
        console.error("Failed to load docs schema:", err);
      }
    };

    if (TAB_NAMES[activeTab] === "Docs") {
      loadDocsSchema();
    }
  }, [activeTab]);

  const handleButtonClick = () => {
    if (activeTab === 0) {
      if (formRef.current?.checkValidity()) {
        setActiveTab((prev) => prev + 1);
      } else {
        formRef.current?.reportValidity();
      }
    } else if (activeTab === 1) {
      if (formRef.current?.checkValidity()) {
        formRef.current?.requestSubmit();
      } else {
        formRef.current?.reportValidity();
      }
    }
  };

  return (
    <Wrapper>
      <Navbar>
        {TAB_NAMES.map((name, index) => (
          <TabButton
            key={name}
            $active={activeTab === index}
          >
            {name}
          </TabButton>
        ))}
      </Navbar>

      <div>
        <div className="text-xl font-bold mb-4">{TAB_NAMES[activeTab]} Details</div>
        {TAB_NAMES[activeTab] === "Docs" ? (
          <DynamicForm ref={formRef} schema={docsSchema} />
        ) : (
          <DynamicForm ref={formRef} schema={schemas[activeTab] || []} />
        )}

        {/* Global Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full max-w-xl mx-auto mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {btnTitles[activeTab] || "Submit"}
        </button>
      </div>
    </Wrapper>
  );
}
