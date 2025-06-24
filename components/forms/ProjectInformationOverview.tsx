// components/forms/ProjectInformationOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const ProjectInformationOverview = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";

    return (
        <div className="p-0 pb-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white pt-2 col-span-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Query Subject: </h4>
                    <p>{get("Query Subject")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Is This a Follow Up?: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        {get("Is This a Follow Up?")}
                    </Badge>
                </div>

                <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Project Document: </h4>
                    <p>{get("Project Document")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Budgeted Hours: </h4>
                    <p>{get("Budgeted Hours")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex  border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Due Date: </h4>
                    <p>{get("Due Date")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Activity: </h4>
                    <p>{get("Activity")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex  border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Go Live Date: </h4>
                    <p>{get("Go Live Date")}</p>
                </div>
                  <div className="bg-white col-span-2  pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Not Billable Reason: </h4>
                    <p>{get("Not Billable Reason")}</p>
                </div>
                <div className="bg-white col-span-2 pt-2 pb-2 p-4 flex  border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Detailed Reason: </h4>
                    <p>{get("Detailed Reason")}</p>
                </div>
            </div>
        </div>


    );
};

export default ProjectInformationOverview;
