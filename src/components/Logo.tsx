import React from "react";

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    maxWidth?: string;
};

export default function Logo({ maxWidth = "40px", alt = "LinkSaver", className = "", ...props }: LogoProps) {
    return (
        <img
            src={'/icon.png'}
            alt={alt}
            style={{ maxWidth, width: "100%", height: "auto" }}
            className={className}
            {...props}
        />
    );
}
