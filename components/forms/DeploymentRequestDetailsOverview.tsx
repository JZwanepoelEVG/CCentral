// components/forms/DeploymentRequestDetailsOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const DeploymentRequestDetailsOverview = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";

    return (
        <div className="p-0 mb-2">
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-white col-span-3  pt-2 pb-2 p-4  rounded-none">
                    <p className={'whitespace-pre-wrap'}>{get("Details of Deployment")}</p>
                </div>
                <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Deployment Date Requested: </h4>
                    <p>{get("Deployment Date Requested")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Deployment Confirmed with Client: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        {get("Deployment Confirmed with Client")}
                    </Badge>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Deployment Confirmed with Client: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        {get("Deployment Confirmed with Client")}
                    </Badge>
                </div>


                <div className="bg-white col-span-3  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Comment: </h4>
                    {get("Comment")}
                </div>

            </div>
        </div>
    );
};

export default DeploymentRequestDetailsOverview;
