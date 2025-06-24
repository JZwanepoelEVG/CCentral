export interface XmlField {
    id: string;
    name: string;
    type: string;
    visible: string;
    editable: string;
    value: string;
}

/**
 * Parses XML form data into a structured array of fields.
 * @param xml - The XML string to parse
 * @param filter - Optional filter object e.g. { type: "File", visible: "True" }
 */
export function parseXmlFields(
    xml: string,
    filter: Partial<{ type: string; visible: string }> = {}
): XmlField[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const fieldNodes = xmlDoc.getElementsByTagName("Field");

    const result: XmlField[] = [];

    for (let i = 0; i < fieldNodes.length; i++) {
        const el = fieldNodes[i];
        const type = el.getAttribute("Type") || "";
        const visible = el.getAttribute("Visible") || "";

        const matchesFilter =
            (!filter.type || filter.type === type) &&
            (!filter.visible || filter.visible === visible);

        if (matchesFilter) {
            result.push({
                id: el.getAttribute("ID") || "",
                name: el.getAttribute("Name") || "",
                type,
                visible,
                editable: el.getAttribute("Editable") || "",
                value: el.textContent?.trim() || "",
            });
        }
    }

    return result;
}
