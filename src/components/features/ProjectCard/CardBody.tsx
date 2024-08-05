import React from "react";
import { CardBodyProps } from "@/types";
import UrlInfo from "./UrlInfo";
import CommitInfo from "./CommitInfo";

const CardBody: React.FC<CardBodyProps> = ({
  productionUrl,
  latestCommit,
  productionTime,
  latestTime,
}) => (
  <div className="flex flex-col gap-2 px-4 pb-4">
    <UrlInfo
      url={productionUrl}
      label="Latest deployment"
      time={productionTime}
    />
    <CommitInfo commit={latestCommit} time={latestTime} />
  </div>
);

export default CardBody;
