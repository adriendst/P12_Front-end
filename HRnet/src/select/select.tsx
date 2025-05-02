import React, { useState, useEffect, useRef } from "react";
import { SelectOption } from "../createEmployee/createEmployee";
import "./select.css";

function Select({
    label,
    options,
    value,
    onChange,
    direction,
}: {
    label?: string;
    options: SelectOption[];
    value: SelectOption;
    onChange: (option: SelectOption) => void;
    direction?: "top" | "bottom";
}) {
    const [isFocus, setIsFocus] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isFocus) return;

        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsFocus(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFocus]);
    return (
        <div className="select" ref={selectRef}>
            {label && <label>{label}</label>}
            <input value={value.text} onClick={() => setIsFocus(true)} readOnly />

            {isFocus && (
                <div className={`${direction === "top" ? "topDirection " : ""}options`}>
                    {options.map((o: SelectOption, index) => (
                        <div
                            className={`${value.text === o.text ? "optionSelected " : ""}option`}
                            onClick={() => {
                                onChange(o);
                                setIsFocus(false);
                            }}
                            key={index}
                        >
                            {o.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;
