// CameraComponent.tsx
import React, { useRef } from "react";
import { IonButton } from "@ionic/react";
import Webcam from "react-webcam";

const CameraComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const takePhoto = () => {
    // Use the webcamRef to access webcam methods if needed
    const imageSrc = webcamRef.current?.getScreenshot();
    // Handle the captured image
    console.log(imageSrc);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          width: "80%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <IonButton onClick={takePhoto} size="small">
        Scan
      </IonButton>
    </div>
  );
};

export default CameraComponent;
