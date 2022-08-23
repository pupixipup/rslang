import React from 'react'

const createSectionsArray = (number: number) => {

  const sectionsArray = [];
  for (let i = 0; i <= number; i++) {
    sectionsArray.push(i);
  }
  return sectionsArray;
}

function Section(props: {location: number[], sectionId: number, setPage: (arr: number[]) => void}) {
  const { location, sectionId, setPage } = props;
  const isSectionOn = (id: number) => {
    const currentSection = location[1];
    return id === currentSection;
  }
  
  return (
    <div onClick={() => setPage([0, sectionId])} className={isSectionOn(sectionId) 
      ? 'sections__section --active'
      : 'sections__section'}>{ sectionId + 1 }</div>
  )
}

export { createSectionsArray, Section }