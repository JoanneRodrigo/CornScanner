import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSearchbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  arrowUpOutline,
  arrowDownOutline,
  timeOutline,
  listOutline,
  filterOutline,
} from "ionicons/icons";

interface Corn {
  corn_name: string;
  corn_desc: string;
  created_at: string; // Assuming created_at is a timestamp
  corn_type: string;
}

const BookPage: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [cornList, setCornList] = useState<Corn[]>([]);
  const [filteredCornList, setFilteredCornList] = useState<Corn[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/corn/")
      .then((response) => response.json())
      .then((data) => {
        setCornList(data);
        setFilteredCornList(data);
      })
      .catch((error) => console.error("Error fetching corns:", error));
  }, []);

  const handleCornClick = (cornName: string) => {
    history.push(`/corn/${cornName}`);
  };

  const handleSort = (sortType: string) => {
    let sortedList: Corn[] = [...filteredCornList];

    switch (sortType) {
      case "time":
        sortedList = sortedList.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "name-asc":
        sortedList = sortedList.sort((a, b) =>
          a.corn_name.localeCompare(b.corn_name)
        );
        break;
      case "name-desc":
        sortedList = sortedList.sort((a, b) =>
          b.corn_name.localeCompare(a.corn_name)
        );
        break;
      case "type":
        sortedList = sortedList.sort((a, b) =>
          a.corn_type.localeCompare(b.corn_type)
        );
        break;
      default:
        break;
    }

    setCornList(sortedList);
  };

  const handleFilter = () => {
    const filteredList = cornList.filter((corn) =>
      corn.corn_name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCornList(filteredList);
  };

  return (
    <IonCard style={{ backgroundColor: "#131313" }}>
      <IonCardHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="8">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                size="small"
              />
            </IonCol>
            <IonCol size="4" style={{ display: "flex", alignItems: "center" }}>
              <IonButton
                size="small"
                onClick={() => {
                  handleSort("time");
                  handleFilter();
                }}
                style={{ marginRight: "5px" }}
              >
                <IonIcon icon={timeOutline} />
              </IonButton>
              <IonButton
                size="small"
                onClick={() => {
                  handleSort("name-asc");
                  handleFilter();
                }}
                style={{ marginRight: "5px" }}
              >
                <IonIcon icon={arrowUpOutline} />
              </IonButton>
              <IonButton
                size="small"
                onClick={() => {
                  handleSort("name-desc");
                  handleFilter();
                }}
                style={{ marginRight: "5px" }}
              >
                <IonIcon icon={arrowDownOutline} />
              </IonButton>
              <IonButton
                size="small"
                onClick={() => {
                  handleSort("type");
                  handleFilter();
                }}
              >
                <IonIcon icon={listOutline} />
              </IonButton>
              <IonButton
                size="small"
                onClick={() => handleFilter()}
                style={{ marginLeft: "5px" }}
              >
                <IonIcon icon={filterOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCardTitle>List Of Corn</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <ul>
          {filteredCornList.map((corn) => (
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
  );
};

export default BookPage;
