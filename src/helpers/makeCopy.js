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
        result = result.replace(/(style="[^"]*)font-size:[^;]*;/g, `$1font-size: ${fontSize}px;`);
    }
    
    if (isFontFamily) {
        result = result.replace(/(style="[^"]*)font-family:[^;]*;/g, `$1font-family: ${fontFamily};`);
    }
    
    if (isColorLink) {
        result = result.replace(/<a\s+(?:[^>]*?\s+)?style="([^"]*)"/g, (match, styleAttr) => {
            
            if (styleAttr.includes('color:')) {
                return match.replace(/color:[^;]+;/, `color: ${colorLink};`);
            } else {
                return match.replace(/(style="[^"]*)"/, `$1 color: ${colorLink};`);
            }
        });
        
    }

    
    
    if (isWidth) {
        // Заміна ширини, враховуючи тег <img>
        result = result.replace(/<(div|span)\s+width="(\d+)"((?!img)[^>]*)/g, (match, tag, widthAttr, remainingAttrs) => {
            const style = `width:${width}px;`;
            return `<${tag} width="${width}"${remainingAttrs ? remainingAttrs : ''}`;
        });

        // Заміна максимальної ширини, не враховуючи тег <img>
        result = result.replace(/max-width:[^;]+;/g, `max-width: ${width}px;`);
    }
    
  
    
  
    
    
     

    if (isPaddingLR) {
        // 
    }

    return result;
};

export default makeCopy;
