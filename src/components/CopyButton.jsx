import { useCopyToClipboard } from "@uidotdev/usehooks";

export default function CopyButton({ label, text }) {
    const [copiedText, copy] = useCopyToClipboard();

    return (
        <button
            type="button"
            className={`
            text-white
            ${
                copiedText === text
                  ? `
                    bg-green-700
                    hover:bg-green-800
                    focus:ring-green-300
                ` : `
                    bg-blue-700
                    hover:bg-blue-800
                    focus:ring-blue-300
                `
            }
            focus:ring-4
            font-medium
            rounded-lg
            text-sm
            px-5 py-2.5 me-2 mb-2
            dark:focus:outline-none
        `}
            onClick={() => copy(text)}
        >
            {label}
        </button>
    );
}
