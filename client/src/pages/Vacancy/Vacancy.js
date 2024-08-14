import React from "react";
import CardSection from "../../components/CardSectoin/CardSection";

const VacancyPage = () => {
  return (
      <div
        className='bacgroundWraoer'
        style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/Multitasking_2.svg)`}}
      >
        <CardSection />
      </div>
  );
};

export default VacancyPage;
