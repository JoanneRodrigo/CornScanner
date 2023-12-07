import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSearchbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

interface Corn {
  corn_name: string;
  corn_desc: string;
}

const BookPage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [cornList, setCornList] = useState<Corn[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/corn/")
      .then((response) => response.json())
      .then((data) => setCornList(data))
      .catch((error) => console.error("Error fetching corns:", error));
  }, []);

  const handleCornClick = (cornName: string) => {
    history.push(`/corn/${cornName}`);
  };

  return (
    <div>
      <IonCard style={{ backgroundColor: "#131313" }}>
        <IonCardHeader>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonCardTitle>List Of Corn</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <ul>
            {cornList.map((corn) => (
              <li
                key={corn.corn_name}
                onClick={() => handleCornClick(corn.corn_name)}
              >
                {corn.corn_name}
              </li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default BookPage;
