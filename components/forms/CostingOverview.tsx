// components/forms/TicketOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const CostingOverview = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";
    const formatRetainerStatus = (xmlValue: string): string[] => {
        return xmlValue
            .split('\n')                            // Split by new lines
            .map(line => line.trim())              // Trim each line
            .filter(line => line.length > 0);      // Remove empty lines
    };
    return (
        <div className="p-0 mb-2">
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Billing Type: </h4>
                    <p>{get("Billing Type")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Rand Value: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        R {get("Rand Value")}
                    </Badge>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Budgeted Hours: </h4>
                    {get("Budgeted Hours")}
                </div>
                <div className="bg-white pt-2 pb-2 p-4 flex flex-col border rounded-none shadow-inner">
                    <h4 className="mr-2 font-bold">Retainer Status:</h4>
                    <div className="mt-1 space-y-1">
                        {formatRetainerStatus(get("Retainer Status")).map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CostingOverview;
