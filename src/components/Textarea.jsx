export default function Textarea({ content, className }) {
    return (
        <div className={`my-1 mx-2 ${className}`}>
            <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                    className="
                    w-full rounded-md
                    border-0 p-1.5 text-gray-900
                    ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset
                    focus:ring-blue-600 sm:text-sm
                    font-mono
                    "
                    value={content}
                    onChange={() => {}}
                    rows={6}
                />
            </div>
        </div>
    );
}
