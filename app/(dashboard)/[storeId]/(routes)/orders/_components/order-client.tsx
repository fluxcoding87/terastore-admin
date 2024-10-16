"use client";

import Heading from "../../settings/_components/heading";

import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { columns, OrderColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect } from "react";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store."
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
