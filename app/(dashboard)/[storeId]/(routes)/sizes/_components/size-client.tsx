"use client";

import { Button } from "@/components/ui/button";
import Heading from "../../settings/_components/heading";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect } from "react";
import ApiList from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="size-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizesClient;
