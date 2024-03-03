import React from "react";
import { Group, Stack, Paper, Button, Text } from "@mantine/core";
import { IconAlertCircle, IconCheck } from "@tabler/icons";
import { saveAs } from 'file-saver';
import axios from "axios";


const CroppedImage = ({ img, setCloseImage }) => {
  const downloadImage = () => {
    saveAs(img, "image.jpg");
  };
  // const uploadImage = async () => {
  //   try {
  //     const body = new FormData()
  //     const fileImage = new File([img],new Date()+'cropped',{ type: 'application/png' })
  //     const reqFileObject = {
  //       fieldname: 'upload',
  //       originalname: fileImage.name,
  //       encoding: '7bit',
  //       mimetype: fileImage.type,
  //       destination: './uploads/profile',
  //       filename: `upload${Date.now()}-${Math.floor(Math.random() * 1000)}.pdf`, // Generate a unique filename
  //       path: `uploads\\profile\\upload${Date.now()}-${Math.floor(Math.random() * 1000)}.pdf`, // Adjust as needed
  //       size: fileImage.size
  //   };
  //     body.append('upload', reqFileObject)
  //     const response = await axios.post('http://localhost:3312/gallary/v1/image/63e1532bac33633a3df896e3', body, {
  //       headers: {"Content-Type":'multipart/form-data'}
  //     })
  //    if(response.data.data){
  //     alert("Image upload successfully!")
  //    }
  //   } catch (error) {
  //     alert("Image upload failed!")
  //   }
  // }
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
          width: "60vw",
          height: "70vh",
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
            width: "70%",
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (max-width: 855px)": {
              width: "90%",
              height: "90%",
            },
          }}
        >
          <Text size={"xl"}>Cropped Image!</Text>
          <img
            src={img}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <Group>
            <Button
              onClick={() => {
                downloadImage();
                setCloseImage("");
                // uploadImage()
              }}
              sx={{ height: "auto" }}
              p="sm"
            >
              <Group>
                <IconCheck size={20} />
                <Text>Save Image</Text>
              </Group>
            </Button>
            <Button
              onClick={() => setCloseImage("")}
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

export default CroppedImage;
