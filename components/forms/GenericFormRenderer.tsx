// components/forms/GenericFormRenderer.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { parseXmlFields } from "@/src/utils/xmlParser";

const GenericFormRenderer = ({ xml }: { xml: string }) => {
    const fields = parseXmlFields(xml);

    return (
        <>
                {fields.map((field, idx) => (
                    <div key={idx}>
                        <strong>{field.name}</strong>
                        <div>{field.value}</div>
                    </div>
                ))}
        </>
    );
};

export default GenericFormRenderer;
