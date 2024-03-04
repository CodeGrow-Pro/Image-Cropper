import axios from "axios";
import convertBlobUrlToFile from "./convertInFIle";

export const uploadImage = async (img,isPdf=false) => {
    try {
      const body = new FormData()
      let fileImage = null
      await convertBlobUrlToFile(img, isPdf ? "report.pdf":"image.png").then((file) => {
        // Now 'file' is a File object that can be used for uploading
        fileImage = file
        // Call your upload function here using the 'file' object
      })
        .catch((error) => {
          console.error("Error converting Blob URL to File:", error);
        });
      body.append('upload', fileImage)
      const response = await axios.post('http://localhost:3312/gallary/v1/image/63e1532bac33633a3df896e3', body, {
        headers: { "Content-Type": 'multipart/form-data' }
      }).then((result)=>{
        if (result.data.data) {
          alert("Image upload successfully!")
        }
      })
      
    } catch (error) {
      alert("Image upload failed!")
    }
  }

export const uploadPdf = async (img)=>{
    try {
        const body = new FormData()
        let fileImage = null
        await convertBlobUrlToFile(img,"report.pdf").then((file) => {
          // Now 'file' is a File object that can be used for uploading
          fileImage = file
          // Call your upload function here using the 'file' object
        })
          .catch((error) => {
            console.error("Error converting Blob URL to File:", error);
          });
        body.append('file', fileImage)
        const response = await axios.post('https://api.the10x.io/user/image-upload', body, {
          headers: { "Content-Type": 'multipart/form-data' ,'accessToken':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ0NzQ4YTMzNGVjNTFjZmFiZDVlMTUiLCJpYXQiOjE3MDk1NTU4NzEsImV4cCI6MTcwOTgxNTA3MX0.8u7pb4-Ip_h9ZpdZRKjcqQdqqkTIdep1JV4cYmwN7c0'}
        }).then((result)=>{
          if (result.data.data) {

            alert("Image upload successfully!",result.data.data.fileUrl)
          }
        })
        
      } catch (error) {
        alert("Image upload failed!")
      }
}