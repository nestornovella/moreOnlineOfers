import { useEffect, useState } from 'react'
import axios from 'axios';

function useCloudinary() {

  //const [file, setFiles] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxzj1jotg/image/upload/"
  const CLOUDINARY_PRESET = "z1kq1ogn"

  function uploadToCloudinary(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)
    if (file) {
      return axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        //.then(response => {console.log(response.data); return response})
        .then(response => response.data.url)
        .catch(err => console.log(err))

    }
  }

  return {
    //addFiles,
    uploadToCloudinary
  }

}
export default useCloudinary