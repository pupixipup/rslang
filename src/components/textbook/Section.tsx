import React from 'react'

const createSectionsArray = (number: number) => {

  const sectionsArray = [];
  for (let i = 0; i <= number; i++) {
    sectionsArray.push(i);
  }
  return sectionsArray;
}

function Section(props: {location: number[], sectionId: number, setNumbers: (arr: number[]) => void}) {
  const { location, sectionId, setNumbers } = props;
  const isSectionOn = (id: number) => {
    const currentSection = location[1];
    return id === currentSection;
  }
  
  return (
    <div onClick={() => setNumbers([0, sectionId])} className={isSectionOn(sectionId) 
      ? 'sections__section --active'
      : 'sections__section'}>{ sectionId + 1 }</div>
  )
}

export { createSectionsArray, Section }