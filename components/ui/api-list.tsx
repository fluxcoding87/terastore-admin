"use client";

import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import ApiAlert from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityIdName, entityName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        vairant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        vairant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        vairant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        vairant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        vairant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
