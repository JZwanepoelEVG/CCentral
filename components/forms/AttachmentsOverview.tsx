"use client";
import { Button } from "@/components/ui/button";
import { parseXmlFields } from "@/src/utils/xmlParser";
import { Icon } from "@iconify/react";

interface AttachmentsOverviewProps {
    xml: string;
}

const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();

    switch (ext) {
        case 'pdf':
            return 'mdi:file-pdf-box';
        case 'doc':
        case 'docx':
            return 'mdi:file-word-box';
        case 'xls':
        case 'xlsx':
            return 'mdi:file-excel-box';
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'mdi:file-image-box';
        case 'zip':
        case 'rar':
            return 'mdi:folder-zip';
        case 'csv':
            return 'mdi:file-delimited';
        default:
            return 'mdi:file';
    }
};

const AttachmentsOverview = ({ xml }: AttachmentsOverviewProps) => {
    const fields = parseXmlFields(xml, { type: "File", visible: "True" })
        .filter(field => field.value && field.value.includes("|"));

    return (
        <div className="col-span-12 mt-2">

                    {fields.length === 0 ? (
                        <p className="text-sm text-default-500">No visible attachments were uploaded.</p>
                    ) : (
                        <ul className="space-y-4">
                            {fields.map((field, index) => {
                                const [fileName, rawUrl] = (field.value || "").split("|");
                                const decodedUrl = rawUrl?.replace(/&amp;/g, "&");

                                return (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between border p-3 rounded bg-white shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon
                                                icon={getFileIcon(fileName)}
                                                className="text-2xl text-default-500"
                                            />
                                            <div className="text-sm text-default-700 break-all">
                                                {fileName}
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-none text-sm"
                                        >
                                            <a
                                                href={'https://clientportal.scubed.co.za' + rawUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                            >
                                                Download
                                            </a>
                                        </Button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
        </div>
    );
};

export default AttachmentsOverview;
