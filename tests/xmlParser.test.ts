import { describe, it, expect } from 'vitest';
import { parseXmlFields } from '../src/utils/xmlParser';

const sampleXml = `
<Form>
    <Field ID="1" Name="Customer" Type="Text" Visible="True" Editable="False">Acme</Field>
    <Field ID="2" Name="Description" Type="File" Visible="True" Editable="True">desc</Field>
    <Field ID="3" Name="Hidden" Type="Text" Visible="False" Editable="True">hidden</Field>
</Form>`;

describe('parseXmlFields', () => {
    it('parses all fields without filter', () => {
        const result = parseXmlFields(sampleXml);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual({
            id: '1',
            name: 'Customer',
            type: 'Text',
            visible: 'True',
            editable: 'False',
            value: 'Acme',
        });
    });

    it('filters by type and visibility', () => {
        const result = parseXmlFields(sampleXml, { type: 'File', visible: 'True' });
        expect(result.length).toBe(1);
        expect(result[0].id).toBe('2');
        expect(result[0].name).toBe('Description');
    });
});
