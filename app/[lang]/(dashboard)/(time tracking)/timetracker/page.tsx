"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const BlankPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Time Tracking</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Time Tracker</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">Time Tracker</div>
    </div>
  );
};

export default BlankPage;