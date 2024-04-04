const makeCopy = ({submit, fontSize, fontFamily, isFontSize, isFontFamily}) => {
    let result = submit;

    if (isFontSize) {
        result = result.replace(/style="[^"]*font-size:[^"]*"/g, `style="font-size: ${fontSize}px;"`);
    }

    if (isFontFamily) {
        result = result.replace(/style="[^"]*font-family:[^"]*"/g, `style="font-family: ${fontFamily};"`);
    }

    return result;
};

export default makeCopy;
