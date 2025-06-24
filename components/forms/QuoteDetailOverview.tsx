// components/forms/TicketOverview.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { parseXmlFields } from "@/src/utils/xmlParser";

const QuoteDetailOverview = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);
    const get = (name: string) => fields.find(f => f.name === name)?.value || "";

    return (
        <div className="p-0 mb-2">
            <div className="grid grid-cols-1 mt-0 gap-2">
                <div className="bg-white justify-center rounded-none ">
                    <p className={'whitespace-pre-wrap text-black'}>{get("Quote Detail")}</p>
                </div>
                <hr className={'py-2'}/>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-white pt-2 pb-2 p-4 flex border rounded-none shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Anticipated Due Date: </h4>
                    <p>{get("Anticipated Due Date")}</p>
                </div>
                <div className="bg-white  pt-2 pb-2 p-4 flex border rounded-none  shadow-inner">
                    <h4 className={'mr-2 font-bold align-top'}>Controlled Document Location: </h4>
                    <Badge className="bg-blue-100 text-blue-600 rounded-none flex items-center justify-center truncate">
                        {get("Controlled Document Location")}
                    </Badge>
                </div>

            </div>
        </div>
    );
};

export default QuoteDetailOverview;
