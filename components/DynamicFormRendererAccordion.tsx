"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import TicketOverview from "@/components/forms/TicketOverview";
import AttachmentsOverview from "@/components/forms/AttachmentsOverview";
import GenericFormRenderer from "@/components/forms/GenericFormRenderer";
import ProjectInformationOverview from "@/components/forms/ProjectInformationOverview";
import HelpdeskReallocationQuery from "@/components/forms/HelpdeskReallocationQuery";
import QuoteDetailOverview from "@/components/forms/QuoteDetailOverview";
import CostingOverview from "@/components/forms/CostingOverview";
import DeploymentRequestDetailsOverview from "@/components/forms/DeploymentRequestDetailsOverview";
import HelpdeskRequireMoreInformation from "./forms/HelpdeskRequireMoreInformation";

interface DynamicFormRendererAccordionProps {
    forms: {
        ID: number;
        Form_ID: number;
        Name: string;
        Form_Values: string;
    }[];
}

const formComponentMap: Record<number, React.FC<{ xml: string }>> = {
    33: TicketOverview,
    14: AttachmentsOverview,
    40: ProjectInformationOverview,
    27: HelpdeskReallocationQuery,
    97: QuoteDetailOverview,
    110: CostingOverview,
    101: DeploymentRequestDetailsOverview,
    29: HelpdeskRequireMoreInformation
};

const hiddenFormIds: number[] = [99,34]; // Add any Form_IDs you want to exclude

const DynamicFormRendererAccordion = ({ forms }: DynamicFormRendererAccordionProps) => {
    // Filter out hidden forms
    const visibleForms = forms.filter(form => !hiddenFormIds.includes(form.ID));

    return (
        <Accordion
            type="multiple"
            className="w-full"
            defaultValue={visibleForms.length > 0 ? [`form-${visibleForms[0].ID}`] : []}
        >
            {visibleForms.map((form) => {
                const FormComponent = formComponentMap[form.ID] || GenericFormRenderer;

                return (
                    <AccordionItem key={form.ID} value={`form-${form.ID}`} className="bg-white shadow mb-2">
                        <AccordionTrigger className="px-4 py-2 font-semibold text-left text-dark">
                            {form.Name}
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                            <FormComponent xml={form.Form_Values} />
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default DynamicFormRendererAccordion;
