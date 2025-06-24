"use client";
import { useEffect, useState, Fragment } from "react";
import DynamicFormRendererAccordion from "@/components/DynamicFormRendererAccordion";

interface TicketForm {
    ID: number;
    Form_ID: number;
    Name: string;
    Form_Values: string;
}

const TicketDetails = ({ ticketID }: { ticketID: number }) => {
    const [forms, setForms] = useState<TicketForm[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const res = await fetch(`/api/tickets/${ticketID}/forms`);
                const data = await res.json();
                if (data.success) {
                    setForms(data.forms);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error("Error loading forms:", err);
            } finally {
                setLoading(false);
            }
        };

        void fetchForms();
    }, [ticketID]);

    return (
        <Fragment>
            {loading ? (
                <p className="p-4">Loading ticket details...</p>
            ) : (
                <DynamicFormRendererAccordion forms={forms} />
            )}
        </Fragment>
    );
};

export default TicketDetails;
