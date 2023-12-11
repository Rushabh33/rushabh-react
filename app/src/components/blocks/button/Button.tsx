import React from 'react'
import "./button.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    designType?: DesignType
    children?: React.ReactNode
}

export enum DesignType {
    primary = "primary",
    secondary = "secondary",
    tertiary = "tertiary",
}

export default function Button({className = "", designType , children, ...props}: ButtonProps){
    
    let designTypeClass = ''
    switch (designType) {
        case DesignType.secondary:
          designTypeClass = `${DesignType.secondary}`;
          break;
        case DesignType.tertiary:
          designTypeClass = `${DesignType.tertiary}`;
          break;
        default:
          designTypeClass = `${DesignType.primary}`;
          break;
      }

    return (
        <button {...props} className={`${className} ${designTypeClass}`}>
            {children}
        </button>
    )
}