import React from "react";
import TooltipLite from 'react-tooltip-lite';

function Tooltip({ content, children, className }){
    return (
        <TooltipLite arrow={false} content={content} className={className}>
            {children}
        </TooltipLite>
    )
}

export default Tooltip;