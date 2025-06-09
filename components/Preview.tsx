import React, { useState } from "react";

interface Props {
  code: string;
}

const Preview: React.FC<Props> = ({ code }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="p-4 border rounded-md bg-white">
            <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: code }}
            />
            <button
            onClick={() => setShowCode(!showCode)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
            {showCode ? "Hide Code" : "Show Code"}
            </button>
            {showCode && (
            <pre className="mt-4 p-3 bg-gray-100 text-sm overflow-x-auto whitespace-pre-wrap rounded">
                {code}
            </pre>
            )}
    </div>
  );
};

export default Preview;
