// components/DynamicFormRenderer.tsx
import TicketOverview from "./forms/TicketOverview";
import GenericFormRenderer from "./forms/GenericFormRenderer";
import AttachmentsOverview from "./forms/AttachmentsOverview";

const formComponentMap: Record<number, React.FC<{ xml: string }>> = {
    33: TicketOverview,         // Support Ticket
    14: AttachmentsOverview,    // Attachments
    // Add more by ID
};

export default function DynamicFormRenderer({
    formId,
    formName,
    xml,
                                            }: {
    formId: number;
    formName: string;
    xml: string;
}) {
    const FormComponent = formComponentMap[formId] || GenericFormRenderer;

    return <FormComponent xml={xml} />;
}
