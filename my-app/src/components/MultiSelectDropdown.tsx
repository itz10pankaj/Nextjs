import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
type DropdownOption = { value: string; label: string };
interface MultiSelectProps {
  options: string[] | DropdownOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 18rem; /* w-72 */
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  text-align: left;
  background-color: white;
  color: #111827; /* text-gray-900 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;

  &:focus {
    border-color: #22c55e; /* border-green-500 */
    box-shadow: 0 0 0 2px #86efac; /* ring-green-400 */
  }
  placeholder {
    color: #9ca3af; /* text-gray-400 */
  }
`;
const Arrow = styled.span`
float: right;
`;
const DropdownList = styled.div`
  position: absolute;
  z-index: 10;
  margin-top: 0.25rem;
  max-height: 15rem; /* max-h-60 */
  width: 100%;
  overflow: auto;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #dcfce7; /* hover:bg-green-100 */
  }

  input {
    margin-right: 0.5rem;
  }
`;


const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const normalizedOptions: DropdownOption[] = Array.isArray(options)
    ? options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <DropdownContainer  ref={dropdownRef}>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? selected.join(", ") : (
          <span >Select an option</span>
        )}
        <Arrow>&#9662;</Arrow> 
      </Button>

      {isOpen && (
        <DropdownList>
          {normalizedOptions.map(option => (
            <OptionLabel key={option.value}>
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              {option.label}
            </OptionLabel>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default MultiSelect;
