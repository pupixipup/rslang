import { useState } from 'react';
import { useLocation } from 'react-router-dom';


interface IGameLocationProps {
   gameMenu: boolean,
   section?: number,
   page?: number
}

export function Audiogame () {
let loc = useLocation();
const locs = loc.state as IGameLocationProps;
return (
 <div>
    <div>
      { JSON.stringify(locs) }
    </div>
  </div>
)
}