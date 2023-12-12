import React, { useRef, useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import Webcam from "react-webcam";
import axios from "axios";

const CameraComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [diseaseDetected, setDiseaseDetected] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const takePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      processImage(imageSrc);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://localhost:8100/upload",
          formData
        );
        setUploadedImage(response.data.data);
        processImage(response.data.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const processImage = async (imageSrc: string) => {
    // Perform any image processing logic here
    // For example, you can use TensorFlow to analyze the image.
    // ...

    // For demonstration purposes, let's simulate disease detection.
    const diseaseFound = Math.random() > 0.5;
    setDiseaseDetected(diseaseFound);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <IonButton onClick={takePhoto}>Take Photo</IonButton>

      {diseaseDetected && <p>Disease Detected!</p>}
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
    </div>
  );
};

export default CameraComponent;
