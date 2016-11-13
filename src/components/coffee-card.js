import React from 'react';
import Card from './card';
import Columns from './columns';

import './coffee-card.css';

export default function CoffeeCard({count=23}) {
  
  return <Card size="2">
    <Columns>
      <div className="CoffeeCard-left">
        <div style={{fontSize: 110}}>{count}</div>
        <div>coffee cups poured today</div>
      </div>
      <div className="CoffeeCard-right">
        <img className="CoffeeCard-right-image" src={process.env.PUBLIC_URL + '/images/coffee.svg'}/>
      </div>
    </Columns>
  </Card>
}