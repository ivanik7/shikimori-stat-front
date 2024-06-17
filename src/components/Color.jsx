import { useState } from "react";
import { HexColorPicker  } from "react-colorful";
import { useClickAway } from "@uidotdev/usehooks";

export default function Color({ label, id, className, onChange, color }) {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useClickAway(() => {
        setIsOpen(false);
    });
    
    return (
        <div className={`my-2 mx-2 ${className}`} ref={ref}>
            <label htmlFor={id} className="">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    id={id}
                    style={{ backgroundColor: color }}
                    className={`
                        block w-full
                        rounded-md border-0 ring-1 ring-inset ring-gray-300
                        focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        p-1.5 font-bold placeholder:text-gray-400
                        h-10
                        text-center
                        ${contrastFont(color) ? "text-black" : "text-white"}
                    `}
                    onClick={() => setIsOpen(true)}
                    value={color}
                    onChange={(e) => onChange(e.target.value)}
                />

                {isOpen ? 
                    <div className="absolute z-10 inline-block text-sm ">
                        <HexColorPicker
                            color={color}
                            onChange={onChange}
                        />
                    </div>
                    : <></>
                }

            </div>
        </div>
    );
}

function contrastFont(bgColor) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB

    return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}
