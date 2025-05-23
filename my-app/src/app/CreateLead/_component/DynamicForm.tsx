'use client';
import React, { useState, useEffect } from 'react';
import MultiSelect from '@/components/MultiSelectDropdown';
import styled from 'styled-components';
import type {FieldSchema} from '../page';


interface DynamicFormProps {
    schema: FieldSchema[];
}

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
`;

const autoCopyMap = [
    {

        trigger: 'per_sameas_cur', // name of the switch
        from: 'per_house_no',      // source field
        to: 'cur_house_no',        // target field
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_rt',
        to: 'cur_rt',
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_rw',
        to: 'cur_rw',
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_province',
        to: 'cur_province',
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_city',
        to: 'cur_city',
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_district',
        to: 'cur_district',
    },
    {
        trigger: 'per_sameas_cur',
        from: 'per_sub_district',
        to: 'cur_sub_district',
    },
];

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
    const [formData, setFormData] = useState<Record<string, string | number | string[] | boolean>>({});

    const handleChange = (name: string, value: string | number | string[] | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };
    //field value ko normalize krne ke liye
    const normalizeValue = (value: string | number | boolean | string[] | undefined) => {
        if (typeof value === 'boolean') {
            return value.toString();
        }
        if (value === undefined || value === null) {
            return '';
        }
        return value;
    };

    const renderField = (field: FieldSchema) => {
        switch (field.type) {
            case 'title':
                return <h2 className="text-lg font-bold">{field.label}</h2>;

            case 'tb':
                const isAutoCopied = autoCopyMap.some(
                    ({ trigger, to }) => to === field.name && formData[trigger] === 1
                );
                return (
                    <Input
                        type="text"
                        name={field.name}
                        placeholder={field.label}
                        value={normalizeValue(formData[field.name])}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.is_required}
                        disabled={isAutoCopied || !field.is_enable}
                    />
                );

            case 'nb':
            case 'currency':
                return (
                    <Input
                        type="number"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={normalizeValue(formData[field.name])}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.is_required}
                        disabled={!field.is_enable}
                    />
                );

            case 'date':
            case 'future_date':
                return (
                    <Input
                        type="date"
                        name={field.name}
                        value={normalizeValue(formData[field.name])}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={field.is_required}
                    />
                );

            case 'dd':
            case 'sdd':
            case 'mmv': {
                //options ko shi format mai read krne ke liye 
                const options = field.options && field.options.length > 0
                    ? field.options.map(opt => (typeof opt === 'string' ? { label: opt, value: opt } : opt))
                    : field.value
                        ? (typeof field.value === 'object' && field.value !== null && 'label' in field.value && 'value' in field.value
                            ? [{ label: (field.value as { label: string; value: string }).label, value: (field.value as { label: string; value: string }).value }]
                            : [])
                        : [];

                const selectedValue = formData[field.name] ?? '';

                return (
                    <select
                        name={field.name}
                        value={normalizeValue(selectedValue)}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required={field.is_required}
                        disabled={!field.is_enable}
                    >
                        <option value="">Select {field.label}</option>
                        {options.map((opt, idx) => (
                            <option key={`${opt.label}-${opt.value}-${idx}`} value={opt.value}>
                                {typeof opt.label === "string" ? opt.label : JSON.stringify(opt.label)}
                            </option>
                        ))}
                    </select>
                );
            }

            case 'ms':
                return (
                    <MultiSelect
                        options={field.options || []}
                        selected={Array.isArray(formData[field.name]) ? (formData[field.name] as string[]) : []}
                        onChange={(val) => handleChange(field.name, val)}
                    />
                );

            case 'radio':
                return (
                    <div>
                        {field.options?.map((opt: string | { label: string; value: string }, idx) => {
                            const label = typeof opt === 'string' ? opt : opt.label;
                            const value = typeof opt === 'string' ? opt : opt.value;

                            return (
                                <label key={`${label}-${value}-${idx}`} style={{ marginRight: '1rem' }}>
                                    <input
                                        type="radio"
                                        name={field.name}
                                        value={normalizeValue(value)}
                                        checked={String(formData[field.name]) === String(value)}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        required={field.is_required}
                                    />
                                    {typeof label === "string" ? label : JSON.stringify(label)}
                                </label>
                            );
                        })}
                    </div>
                );

            case 'switch':
                return (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name={field.name}
                            value={normalizeValue(formData[field.name])}
                            checked={formData[field.name] === 1 || formData[field.name] === true}
                            onChange={(e) => handleChange(field.name, e.target.checked)}
                        />
                        <span>{formData[field.name] === 1 || formData[field.name] === true ? 'On' : 'Off'}</span>
                    </label>
                );

            case 'mobile':
                return (
                    <div className="flex items-center gap-2">
                        <input
                            type="tel"
                            inputMode="numeric"
                            className="flex-1 px-3 py-2 border rounded w-full"
                            placeholder="Enter mobile number"
                            value={normalizeValue(formData[field.name])}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            minLength={field.validation?.min_length}
                            maxLength={field.validation?.max_length}
                            required={field.is_required}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    //ye vala function hai parent field ke acc uski child field set krne ke liey
    const shouldRenderField = (field: FieldSchema): boolean => {
        if (field.field_show) {
            const [depField, depValue] = field.field_show.split('/');
            return formData[depField] == depValue;
        }
        return true;
    };


    useEffect(() => {
        schema.forEach(field => {
            if (field.parent_depedencies) {
                const parents = field.parent_depedencies.split(',').map(p => p.trim());
                const values = parents.map(p => Number(formData[p]) || 0);
                const sum = values.reduce((acc, curr) => acc + curr, 0);

                if (formData[field.name] !== sum) {
                    setFormData(prev => ({ ...prev, [field.name]: sum }));
                }
            }
        });
    }, [formData,schema]);


    //default value set krne ke liye 
    useEffect(() => {
        schema.forEach(field => {
            //default value set krne ke liye 
            if (field.value && formData[field.name] === undefined) {
                const defaultValue =
                    typeof field.value === 'object' && field.value !== null && 'value' in field.value
                        ? field.value.value
                        : field.value;
                setFormData(prev => ({ ...prev, [field.name]: defaultValue as string | number | boolean | string[] }));
            }
        });
    }, [schema]);

    //FOR ADDRESS MAPPING
    const triggered = formData['per_sameas_cur'];
    useEffect(() => {
        autoCopyMap.forEach(({ trigger, from, to }) => {
            if (formData[trigger] == 1) {
                setFormData((prev) => ({
                    ...prev,
                    [to]: prev[from] || '',
                }));
            }
        });
    }, [triggered, ...autoCopyMap.map(({ from }) => formData[from])]);


    //FOR AGE CLACULATE
    const bstkInsurerDate = formData['bstk_insurer_date'];
    useEffect(() => {
        if (typeof bstkInsurerDate === 'string' && bstkInsurerDate) {
            const bstk_insurer_date = new Date(bstkInsurerDate);
            const today = new Date();

            let age = today.getFullYear() - bstk_insurer_date.getFullYear();
            const monthDiff = today.getMonth() - bstk_insurer_date.getMonth();
            const dayDiff = today.getDate() - bstk_insurer_date.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            if (age < 0) age = 0;

            if (formData['bstk_age'] !== String(age)) {
                setFormData(prev => ({ ...prev, bstk_age: String(age) }));
            }
        }
    }, [bstkInsurerDate]);


    const filteredSchema = schema.filter((field, index, self) => {
        return field.type !== 'title' || index === self.findIndex(f => f.type === 'title' && f.label === field.label);
    });

    return (
        filteredSchema.length > 0 ? (
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4"
            >
                {filteredSchema.map((field) => {
                    const visible = field.is_show && shouldRenderField(field);
                    if (!visible) return null;

                    return (
                        <div key={field.name || field.label} className="space-y-1">
                            {field.type !== 'title' && <label className="block font-semibold">{field.label}</label>}
                            {renderField(field)}
                        </div>
                    );
                })}

                <button
                    type="submit"
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        ) : null
    );
};

export default DynamicForm;
