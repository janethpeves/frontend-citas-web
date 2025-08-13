import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import style from "./InputSearh.module.css";

interface InputSearchProps {
  placeholder?: string;
  width?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch = ({ placeholder = "Buscar...", width = "100%", onSearch }: InputSearchProps) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    if (window.innerWidth <= 768 && isCollapsed) {
      setIsCollapsed(false);
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (window.innerWidth <= 768 && !isFocused) {
      setIsCollapsed(true);
    }
    setIsFocused(false);
  };

  return (
    <div 
      className={`${style.input__search__container} ${isCollapsed ? style.collapsed : ''}`}
      style={{ width }}
      onClick={handleClick}
    >
      <i className="pi pi-search" style={{ fontSize: "1.5rem", color: "rgba(25, 168, 228, 1)" }}></i>
      {(!isCollapsed || isFocused) && (
        <InputText 
          className={style.search} 
          placeholder={placeholder} 
          onChange={onSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          autoFocus={isFocused}
        />
      )}
      <Button className={style.search_button} icon="pi pi-search" />
    </div>
  );
}