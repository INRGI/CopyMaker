/* eslint-disable no-prototype-builtins */
const makeUnique = (text) => {
    const replacements = {
        'A': 'А',
        'E': 'Е',
        'I': 'І',
        'O': 'О',
        'P': 'Р',
        'T': 'Т',
        'H': 'Н',
        'K': 'К',
        'X': 'Х',
        'C': 'С',
        'B': 'В',
        'M': 'М',
        'e': 'е',
        'y': 'у',
        'i': 'і',
        'o': 'о',
        'a': 'а',
        'x': 'х',
        'c': 'с',
        '%': '％',
        '$': 'ֆ',
    };

    let newText = '';
    let insideTag = false;
    let entity = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let replaceChar = char;

        if (char === '<') {
            insideTag = true;
        } else if (char === '>') {
            insideTag = false;
        }

        if (char === '&' && !insideTag) {
            entity = '&';
        } else if (char === ';' && entity !== '' && !insideTag) {
            entity += ';';
            if (replacements.hasOwnProperty(entity)) {
                replaceChar = replacements[entity];
            }
            entity = '';
        } else if (entity !== '' && !insideTag) {
            entity += char;
        } else if (!insideTag && replacements.hasOwnProperty(char)) {
            replaceChar = replacements[char];
        }

        newText += replaceChar;
    }

    return newText;
};

export default makeUnique;
