import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSearchbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const navigateToUserList = () => {
    history.push("/example");
  };

  // Mock data (replace with actual data from your backend)
  const goodCornCount = 50;
  const badCornCount = 10;
  const totalUsers = goodCornCount + badCornCount;

  return (
    <div>
      <IonCard style={{ backgroundColor: "#131313" }}>
        <IonCardHeader>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonCardSubtitle>Summary</IonCardSubtitle>
          <IonCardTitle>Overview</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {/* Sub-Cards with Different Colors */}
          <IonCard color="secondary">
            <IonCardHeader>
              <IonCardSubtitle>Good Corn</IonCardSubtitle>
              <IonCardTitle>{goodCornCount}</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          <IonCard color="tertiary">
            <IonCardHeader>
              <IonCardSubtitle>Bad Corn</IonCardSubtitle>
              <IonCardTitle>{badCornCount}</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          <IonCard
            onClick={navigateToUserList}
            color="primary"
            style={{ cursor: "pointer" }}
          >
            <IonCardHeader>
              <IonCardSubtitle>Users</IonCardSubtitle>
              <IonCardTitle>{totalUsers}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default HomePage;
