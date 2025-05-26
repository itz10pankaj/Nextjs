'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import MultiSelect from '@/components/MultiSelectDropdown';
import Image from 'next/image';
import styled from 'styled-components';
import type { FieldSchema } from '../page';

interface DynamicFormProps {
    schema: FieldSchema[];
}
type FormValue = string | number | boolean | string[] | File | Record<number, File | string>;
// type FormValue = any;
type FormDataType = Record<string, FormValue>;

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



const DynamicForm = forwardRef<HTMLFormElement, DynamicFormProps>(({ schema }, ref) => {
        const [formData, setFormData] = useState<FormDataType>({});
        const handleChange = (name: string, value: FormValue) => {
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            console.log('Form Submitted:', formData);
        };

        const ParentDepency:string[] = [];
        schema.forEach(field => {
            if (field.parent_depedencies) {
                const parents = field.parent_depedencies.split(',').map(p => p.trim());
                ParentDepency.push(...parents);
            }
        });

        const getFieldValue = <T extends FormValue>(name: string, defaultValue: T): T => {
            const value = formData[name];
            return value !== undefined ? value as T : defaultValue;
        };

        // Type-safe option type guard
        const isOptionObject = (opt: unknown): opt is { label: string; value: string } => {
            return typeof opt === 'object' && opt !== null && 'label' in opt && 'value' in opt;
        };

        const renderField = (field: FieldSchema) => {
            switch (field.type) {
                case 'title':
                    return <h2 className="text-lg font-bold">{field.label}</h2>;

                case 'tb':
                    const isAutoCopied = autoCopyMap.some(
                        ({ trigger, to }) => to === field.name && getFieldValue(trigger, false)
                    );
                    return (
                        <Input
                            type="text"
                            name={field.name}
                            placeholder={field.label}
                            value={getFieldValue(field.name, '')}
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
                            value={getFieldValue(field.name, "")}
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
                            value={getFieldValue(field.name, '')}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.is_required}
                        />
                    );

                case 'dd':
                case 'sdd':
                case 'mmv': {
                    //options ko shi format mai read krne ke liye 
                    const options = (field.options || []).map(opt =>
                        isOptionObject(opt) ? opt : { label: String(opt), value: String(opt) }
                    );

                    const selectedValue = getFieldValue(field.name, '');
                    const displayValue = typeof selectedValue === 'object' ? '' : selectedValue;

                    return (
                        <select
                            name={field.name}
                            value={displayValue}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required={field.is_required}
                            disabled={!field.is_enable}
                        >
                            <option value="">Select {field.label}</option>
                            {options.map((opt, idx) => (
                                <option key={`${opt.value}-${idx}`} value={opt.value}>
                                    {opt.label}
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
                            {(field.options || []).map((opt, idx) => {
                                const option = isOptionObject(opt) ? opt : { label: String(opt), value: String(opt) };
                                return (
                                    <label key={`${option.value}-${idx}`} style={{ marginRight: '1rem' }}>
                                        <input
                                            type="radio"
                                            name={field.name}
                                            value={option.value}
                                            checked={getFieldValue(field.name, '') == option.value}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            required={field.is_required}
                                        />
                                        {option.label}
                                    </label>
                                );
                            })}
                        </div>
                    );

                case 'switch':
                    return (
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={getFieldValue<number>(field.name, 0) === 1}
                                onChange={(e) => handleChange(field.name, e.target.checked ? 1 : 0)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                                disabled={!field.is_enable}
                                required={field.is_required}
                            />
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
                                value={String(formData[field.name] ?? "")}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                minLength={field.validation?.min_length}
                                maxLength={field.validation?.max_length}
                                required={field.is_required}
                            />
                        </div>
                    );


                case "image": {
                    const images = getFieldValue(field.name, {} as Record<number, File | string>);
                    const imageCount = field.multiple ?? 1;

                    return (
                        <div className="flex gap-4">
                            {[...Array(imageCount)].map((_, idx) => {
                                const index = idx + 1;
                                const file = images[index];
                                const previewUrl =
                                    file && typeof file !== "string" ? URL.createObjectURL(file) : null;
                                const isRequired = field.is_required && index === 1;
                                return (
                                    <div
                                        key={index}
                                        className="w-40 h-40 border-2 border-dashed border-gray-300 rounded flex items-center justify-center relative overflow-hidden cursor-pointer group"
                                    >
                                        <input
                                            type="file"
                                            name={`${field.name}_${index}`}
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                handleChange(
                                                    field.name,
                                                    Object.fromEntries(
                                                        Object.entries({ ...images, [index]: file }).filter(
                                                            ([, v]) => v !== undefined
                                                        )
                                                    ) as Record<number, File | string>
                                                );
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            required={isRequired}
                                            disabled={!field.is_enable}
                                        />

                                        {!previewUrl ? (
                                            <div className="flex flex-col items-center text-gray-500 group-hover:text-gray-700 transition">
                                                <div className="text-3xl">+</div>
                                                <span className="text-sm font-medium text-center">
                                                    Upload Image {index}
                                                </span>
                                            </div>
                                        ) : (
                                            <Image
                                                src={previewUrl}
                                                alt="Preview"
                                                width={160}
                                                height={160}
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                }

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

        //ye vala function hai parent field ke acc uski child field set krne ke liey        

        const calculateAndSetDependencies = () => {
            // console.log('Calculating dependencies...');
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
        };
        useEffect(() => {
            calculateAndSetDependencies();
        }, [...ParentDepency.map(dep => formData[dep])]);


        //default value set krne ke liye 
        const defaultValues = ()=>{
            schema.forEach(field => {
                if (field.value && formData[field.name] === undefined) {
                    const defaultValue =
                        typeof field.value === 'object' && field.value !== null && 'value' in field.value
                            ? field.value.value
                            : field.value;
                    setFormData(prev => ({ ...prev, [field.name]: defaultValue as string | number | boolean | string[] }));
                }
            });
        }
        useEffect(() => {
            defaultValues();
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
            <div>
                {filteredSchema.length > 0 && (
                    <form
                        ref={ref}
                        onSubmit={handleSubmit}
                        id="dynamic-form"
                        className="w-full max-w-xl p-6 bg-white shadow rounded space-y-4"
                    >
                        {filteredSchema.map((field) => {
                            const visible = field.is_show && shouldRenderField(field);
                            if (!visible) return null;

                            return (
                                <div key={field.name || field.label} className="space-y-1">
                                    {field.type !== 'title' && (
                                        <label className="block font-semibold">{field.label}</label>
                                    )}
                                    {renderField(field)}
                                </div>
                            );
                        })}
                    </form>
                )}
            </div>
        );
    });

    DynamicForm.displayName = 'DynamicForm';
export default DynamicForm;
