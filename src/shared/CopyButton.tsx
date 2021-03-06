import { Button } from "@blueprintjs/core";
import * as React from "react";

interface CopyButtonProps {
  onClick: React.MouseEventHandler<HTMLElement> | undefined;
}

const Copy: React.SFC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fillRule="evenodd"
    clipRule="evenodd"
    className="copy-button"
  >
    <path d="M20 24h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3v9h-2v-7h-4l-2 2h-3.898l-2.102-2h-4v18h16v-5h2v7zm-10-4h-6v-1h6v1zm0-2h-6v-1h6v1zm6-5h8v2h-8v3l-5-4 5-4v3zm-6 3h-6v-1h6v1zm0-2h-6v-1h6v1zm0-2h-6v-1h6v1zm0-2h-6v-1h6v1zm-1-7c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1z" />
  </svg>
);

const CopyButton: React.SFC<CopyButtonProps> = ({ onClick }) => (
  <Button icon={<Copy />} minimal={true} onClick={onClick} />
);

export default CopyButton;
