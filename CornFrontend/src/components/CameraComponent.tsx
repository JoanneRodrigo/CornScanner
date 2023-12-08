// CameraComponent.tsx
import React, { useRef } from "react";
import { IonButton, IonImg } from "@ionic/react";
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
    <div style={{ position: "relative", height: "100vh" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: "100%", height: "auto" }}
      />
      <IonButton
        onClick={takePhoto}
        style={{
          position: "absolute",
          bottom: "70px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Take Photo
      </IonButton>
    </div>
  );
};

export default CameraComponent;
