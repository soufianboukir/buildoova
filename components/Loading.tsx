import React from "react";

const Loading = ({isAiGenerates}: {isAiGenerates: boolean}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 border-solid mb-4 shadow-lg" />
            <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-300 border-solid opacity-70" style={{ animationDirection: 'reverse' }} />
        </div>

        <p className="text-gray-700 text-lg font-medium mb-6 animate-pulse">
            {
                isAiGenerates ?
                "Generating your page, please wait..." : "Loading! please wait"
            }
        </p>

        {
            isAiGenerates && (
                <div className="max-w-md text-center px-4">
                    <p className="text-gray-500 text-sm italic">
                    <span className="inline-block animate-fadeInOut">
                        Did you know? Our AI is optimizing your layout for maximum engagement.
                    </span>
                    </p>
                </div>
            )
        }
    </div>
  );
};

export default Loading;