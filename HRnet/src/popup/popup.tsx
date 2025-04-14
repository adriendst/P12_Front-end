import React from "react";
import "./popup.css";

function Popup({
    isOpen,
    message,
    setIsOpen,
}: {
    isOpen: boolean;
    message: string;
    setIsOpen: (isOpen: boolean) => void;
}) {
    return (
        <>
            {isOpen && (
                <div className="popupBackground" onClick={() => setIsOpen(false)}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <span>{message}</span>
                        <div onClick={() => setIsOpen(false)} className="closeButton">
                            ✕
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Popup;
