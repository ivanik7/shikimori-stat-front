export default function ButtonGroup({ buttons }) {
    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {buttons.map(({key, label, onClick, active}, index) => (
                <button
                    key={key}
                    onClick={onClick}
                    type="button"
                    className={`
                        px-5 py-2.5 mb-2
                        text-sm 
                        ${active ? `
                            bg-blue-700 text-white hover:bg-blue-800 
                        ` : `
                            text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700
                        `}
                        border
                        border-gray-200
                        focus:z-10 focus:ring-2
                        focus:ring-blue-700
                        ${index === buttons.length - 1 ? "rounded-e-lg" : ""}
                        ${index === 0 ? "rounded-s-lg" : ""}
                    `}
                >
                    {label}
                </button>
            ))}

        </div>
    );
}
