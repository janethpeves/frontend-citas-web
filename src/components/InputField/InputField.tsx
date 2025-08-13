import React from 'react';
import style from './InputField.module.css';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  icon?: React.ReactNode;
  maxLength?: number; // Agregar maxLength como una propiedad opcional
}

export const InputField = ({ label, type, placeholder, icon, maxLength }: InputFieldProps) => {
  return (
    <div className={style.inputWrapper}>
      <label className={style.label}>{label}</label>
      <div className={style.inputContainer}>
        <input 
          type={type} 
          placeholder={placeholder} 
          className={style.input} 
          maxLength={maxLength} // Pasar maxLength al input
        />
        {icon && <div className={style.icon}>{icon}</div>}
      </div>
    </div>
  );
};
