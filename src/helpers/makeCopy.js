const makeCopy = ({
    submit, 
    fontSize, 
    isFontSize, 
    fontFamily, 
    isFontFamily, 
    colorLink, 
    isColorLink, 
    width, 
    isWidth,
    paddingLR,
    isPaddingLR
}) => {
    let result = submit;

    if (isFontSize) {
        result = result.replace(/style="[^"]*font-size:[^"]*"/g, `style="font-size: ${fontSize}px;"`);
    }

    if (isFontFamily) {
        result = result.replace(/style="[^"]*font-family:[^"]*"/g, `style="font-family: ${fontFamily};"`);
    }

    if (isColorLink) {
        // 
    }

    if (isWidth) {
        // 
    }

    if (isPaddingLR) {
        // 
    }

    return result;
};

export default makeCopy;
