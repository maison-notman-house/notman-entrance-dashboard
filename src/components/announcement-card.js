import React, {Component} from 'react';
import Card from './card';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'title': 'Offices Available',
        'text': 'Contact info@notman.org for more information.',
    },
    fr: {
        'title': 'Bureaux disponibles',
        'text': 'Contactez info@notman.org pour plus d\'information',
    }
});

export default class AnnouncementCard extends Component {

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
    }

    render () {
        return (
            <Card size="2.8" className="announcements">
                <img src="/images/notman-announcements/house-photo.jpg" alt="" role="img"/>
                <h3>{strings['title']}</h3>
                {strings['text']}            
            </Card>
        );

    }
}