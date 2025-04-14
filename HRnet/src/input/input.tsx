import React from "react";
import "./input.css";

function Input({
    label,
    type,
    value,
    onChange,
    isClearable,
}: {
    label?: string;
    type: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isClearable?: boolean;
}) {
    const handleClear = () => {
        const fakeEvent = {
            target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
    };

    return (
        <div className="input">
            {label && <label>{label}</label>}
            <input type={type} value={value} onChange={onChange} />
            {isClearable && value !== "" && <p onClick={handleClear}>✕</p>}
        </div>
    );
}

export default Input;
