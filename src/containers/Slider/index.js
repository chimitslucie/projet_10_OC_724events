import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Comment: changement du comparateur < en > pour inverser le tri des évènements du plus récent au plus ancien
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Comment: Ajout condition pour gérer l'erreur console (byDatedesc.lenght : undefined)
    if (byDateDesc) {
      setTimeout(
        // Comment: Ajout "-1" pour gérer l'arrivée au bout du slider car il n'a que 3 images
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Comment: modification de la place de la key
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Comment: Ajout d'un alt unique */}
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Comment: Modification des param et de la key (key reste fixe, pas de key unique, erreur console) */}
              {byDateDesc.map((bulletPoint, radioIdx) => (
                <input
                  key={`radio-${bulletPoint.title}`}
                  type="radio"
                  name="radio-button"
                  // Comment: index à la place de idx pour associer l'index au radioIdx
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
