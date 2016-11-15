import React from 'react';
import Card from './card';
import Columns from './columns';

import './coffee-card.css';

export default function CoffeeCard({
    count = 23,
    lang = 'en'
}) {

    const text = {
        en: {
            coffeeCups: 'coffee cups'
        },
        fr: {
            coffeeCups: 'tasses de café'
        }
    }[lang];

    return (<Card size="2">
        <Columns>
            <div className="CoffeeCard-left">
                <div style={{
                    fontSize: 110
                }}>{count}</div>
                <div>{text.coffeeCups}</div>
            </div>
            <div className="CoffeeCard-right">
                <img
                    className="CoffeeCard-right-image"
                    src={process.env.PUBLIC_URL + '/images/coffee.svg'}
                    role="img"
                    alt="Coffee"/>
            </div>
        </Columns>
    </Card>);
}