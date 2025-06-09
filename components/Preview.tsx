import React from "react";
import { ViewCode } from "./ViewCode";
import { PublishSite } from "./PublishSite";

interface Props {
  code: string;
}

const Preview: React.FC<Props> = ({ code }) => {
    return (
        <div className="relative p-4 border rounded-md bg-white overflow-hidden">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
                <ViewCode code={code} />
                <PublishSite code={code} />
            </div>

            <div
                className="preview relative z-0"
                dangerouslySetInnerHTML={{ __html: code }}
            />
        </div>
  );
};

export default Preview;
