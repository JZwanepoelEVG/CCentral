// components/forms/TicketOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const TicketOverview = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";

    return (
        <div className="p-0 mb-2">
                <div className="grid grid-cols-1 mb-2 gap-2">
                    <div className="bg-white justify-center rounded-none ">
                        <h4 className={'font-bold'}>Query:</h4>
                        <p className={'whitespace-pre-wrap text-black'}>{get("Query")}</p>
                    </div>
                </div>
            <hr className={'py-2'}/>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white pt-2 col-span-2 pb-2 p-4 flex border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Company: </h4>
                        <p>{get("Company")}</p>
                    </div>
                    <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Query Severity: </h4>
                        <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                            {get("Query Severity")}
                        </Badge>
                    </div>

                    <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Date Logged: </h4>
                        <p>{get("Date Logged")}</p>
                    </div>
                    <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Logged By: </h4>
                        <p>{get("Logged By")}</p>
                    </div>
                    <div className="bg-white  pt-2 pb-2 p-4 flex  border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Account Manager</h4>
                        <p>{get("Account Manager")}</p>
                    </div>
                    <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Query Category</h4>
                        <p>{get("Query Category")}</p>
                    </div>
                    <div className="bg-white  pt-2 pb-2 p-4 flex  border rounded-none shadow-inner">
                        <h4 className={'mr-2 font-bold align-top'}>Query Type</h4>
                        <p>{get("Query Type")}</p>
                    </div>
                </div>
        </div>
    );
};

export default TicketOverview;
