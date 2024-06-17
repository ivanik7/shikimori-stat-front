export default function Input({ label, id, placeholder, value, onChange, error }) {
    return (
        <div className="my-2 mx-2">
            <label htmlFor={id} className="">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type="text"
                    name={id}
                    id={id}
                    className={`
                        block
                        w-full
                        rounded-md
                        border-0
                        p-1.5
                        text-gray-900
                        ring-1 ring-inset
                        placeholder:text-gray-400
                        focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6
                        ${error ? "ring-red-500" : "ring-gray-300"}
                    `}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
