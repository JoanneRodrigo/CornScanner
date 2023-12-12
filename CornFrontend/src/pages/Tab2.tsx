import React, { useRef, useState } from "react";
import { IonButton } from "@ionic/react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import axios from "axios";

const CameraComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          "http://localhost:5000/upload",
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
    // Load a pre-trained model (you would need to train or use a model based on your use case)
    const model = await tf.loadLayersModel("path/to/your/model.json");

    // Preprocess the image (resize, normalization, etc.)
    const img = new Image();
    img.src = imageSrc;

    // Assume your model expects an input shape of [1, height, width, 3]
    const tensor = tf.browser.fromPixels(img).expandDims(0);

    // Make predictions using the model
    const predictions = model.predict(tensor) as tf.Tensor;

    // Convert predictions to JavaScript array
    const predictionsArray = await predictions.data();

    // Check if disease is detected based on your model's output
    const diseaseFound = predictionsArray.some(
      (prediction) => prediction > 0.5
    );

    setDiseaseDetected(diseaseFound);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        style={{ marginBottom: "10px" }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <IonButton onClick={takePhoto} style={{ margin: "5px" }}>
        Capture Photo
      </IonButton>
      <IonButton onClick={triggerFileInput} style={{ margin: "5px" }}>
        Upload Image
      </IonButton>

      {diseaseDetected && <p>Disease Detected!</p>}
      {uploadedImage && (
        <div
          style={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            margin: "10px auto",
          }}
        >
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
