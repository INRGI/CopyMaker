const makeUnique = (text) => {
    const replacements = {
        'A': 'А',
        'E': 'Е',
        'Y': 'У',
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
        'p': 'р',
        'a': 'а',
        'l': 'І',
        'x': 'х',
        'c': 'с',
        '%': '％',
        '$': 'ֆ',
    };

    let newText = '';
    let insideTag = false;
    

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '<') {
            insideTag = true;
        } else if (char === '>') {
            insideTag = false;
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!insideTag && replacements.hasOwnProperty(char.toUpperCase())) {
            newText += replacements[char.toUpperCase()].toLowerCase() === replacements[char.toUpperCase()] ? replacements[char.toUpperCase()] : replacements[char.toUpperCase()].toLowerCase();
        } else {
            newText += char;
        }
    }

    return newText;
}

export default makeUnique;

