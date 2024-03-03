import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Group, Stack, Paper, Button, Text } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons";

const ImageToPdfConverter = ({ imageUrl, setIsGenerateReport }) => {
    const imageContainerRef = useRef();
    const convertToPdf = async () => {
        const imageContainer = imageContainerRef.current;
        if (!imageContainer) {
            return;
        }

        const canvas = await html2canvas(imageContainer);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save('converted_image.pdf');
        setIsGenerateReport(false)
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "90",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
        >
            <Paper
                sx={{
                    width: "90vw",
                    height: "90vh",
                    maxWidth: "800px",
                    maxHeight: "800px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "@media (max-width: 855px)": {
                        width: "90%",
                        height: "90%",
                    },
                }}
                p="md"
            >
                <Stack
                    sx={{
                        width: "auto",
                        height: "90%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "@media (max-width: 855px)": {
                            width: "90%",
                            height: "90%",
                        },
                    }}
                >
                    <Text size={"xl"}>Generated Report!</Text>
                    <div>
                        <div ref={imageContainerRef} style={{display:'flex',justifyContent:'center'}}>
                            <img src={imageUrl} alt="Converted Image" style={{
                                width: "400px",
                                height: "400px",
                                objectFit: "contain",
                            }} />
                        </div>
                    </div>
                    <Group>
                        <Button onClick={convertToPdf}>Download Pdf</Button>
                        <Button
                            onClick={() => setIsGenerateReport(false)}
                            sx={{ height: "auto" }}
                            p="sm"
                        >
                            <Group>
                                <IconAlertCircle size={20} />
                                <Text>Exit</Text>
                            </Group>
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </div>
    );
};

export default ImageToPdfConverter;
