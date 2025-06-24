// components/forms/TicketOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const HelpdeskReallocationQuery = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";

    return (
        <div className="p-0 mb-2">
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Department: </h4>
                    <p>{get("Department")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Team Member: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        {get("Team Member")}
                    </Badge>
                </div>

            </div>

            <div className="grid grid-cols-1 mt-2 gap-2">
                <hr/>
                <div className="bg-white justify-center rounded-none ">
                    <h4 className={'font-bold'}>Comment:</h4>
                    <p className={'whitespace-pre-wrap text-black'}>{get("Comment")}</p>
                </div>
            </div>
        </div>
    );
};

export default HelpdeskReallocationQuery;
