/**
 * Provides a mean to change the body class.
 */

export default class BodyClass {
    static addClassToBody(className) {
        var classNames = className.split(' ');
        classNames.forEach(function (name) {
            document
                    .body
                    .classList
                    .add(name);
        });
   
    }

    static removeClassFromBody(className) {
        document
            .body
            .classList
            .add(className);
    }
}