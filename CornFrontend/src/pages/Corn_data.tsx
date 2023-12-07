// CornDetailsPage.tsx
import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useParams } from "react-router-dom";

interface CornDetails {
  corn_name: string;
  corn_desc: string;
  corn_disease?: string | null;
  corn_cure?: string | null;
}

const CornDetailsPage: React.FC = () => {
  const { cornName } = useParams<{ cornName: string }>();
  const [cornDetails, setCornDetails] = useState<CornDetails | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/corn_details/${cornName}/`)
      .then((response) => response.json())
      .then((data) => setCornDetails(data))
      .catch((error) => console.error("Error fetching corn details:", error));
  }, [cornName]);

  return (
    <div>
      {cornDetails ? (
        <IonCard style={{ backgroundColor: "#131313" }}>
          <IonCardHeader>
            <IonCardTitle>{cornDetails.corn_name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Description: {cornDetails.corn_desc}</p>
            {cornDetails.corn_disease && (
              <p>Disease: {cornDetails.corn_disease}</p>
            )}
            {cornDetails.corn_cure && <p>Cure: {cornDetails.corn_cure}</p>}
          </IonCardContent>
        </IonCard>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CornDetailsPage;
