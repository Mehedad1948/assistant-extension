import React from "react";

type ErrorProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Error({ children, className = "" }: ErrorProps) {
    return (
        <div
            className={`bg-red-600 text-white text-sm rounded-md px-3 py-2 ${className}`}
        >
            {children}
        </div>
    );
}
