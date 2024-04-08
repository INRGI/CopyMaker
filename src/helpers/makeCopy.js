import makeUnique from "./makeUnique";

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
    isPaddingLR,
    isReplace,
    isLinkUrl,
    linkUrl,
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
            return `<${tag} width="${width}"${remainingAttrs ? remainingAttrs : ''}`;
        });

        // Заміна максимальної ширини, не враховуючи тег <img>
        result = result.replace(/max-width:[^;]+;/g, `max-width: ${width}px;`);
    }
    

    if (isPaddingLR) {
        // Заміна значень падінгу в ліво та в право
        result = result.replace(/(style="[^"]*)padding-left:[^;]*;/g, `$1padding-left: ${paddingLR}px;`);
        result = result.replace(/(style="[^"]*)padding-right:[^;]*;/g, `$1padding-right: ${paddingLR}px;`);
    }

    if (isLinkUrl) {
        result = result.replace(/urlhere/g, linkUrl);
    }    

    if (isReplace) {
        result = makeUnique(result);
    }    
    
    return result;
};

export default makeCopy;
