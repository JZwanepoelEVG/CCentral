"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const BlankPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Tickets & Tasks</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Request for Assistance</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">Items</div>
    </div>
  );
};

export default BlankPage;