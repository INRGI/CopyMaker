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
    isTrTB,
    trTB,
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
        result = result.replace(/<(?!img)(\w+)\s+[^>]*?\bwidth="(\d+)"((?!img)[^>]*)/g, (match, tag, widthAttr, remainingAttrs) => {
            return `<${tag} width="${width}"${remainingAttrs ? remainingAttrs : ''}`;
        });       
        result = result.replace(/max-width:[^;]+;/g, `max-width: ${width}px;`);
    }
    

    if (isPaddingLR) {
        result = result.replace(/(style="[^"]*)padding-left:[^;]*;/g, `$1padding-left: ${paddingLR}px;`);
        result = result.replace(/(style="[^"]*)padding-right:[^;]*;/g, `$1padding-right: ${paddingLR}px;`);
    }

    if (isLinkUrl) {
        result = result.replace(/urlhere/g, linkUrl);
    }    

    if (isTrTB) {
        result = result.replace(/(style="[^"]*)padding-top:[^;]*;/g, `$1padding-top: ${trTB}px;`);
        result = result.replace(/(style="[^"]*)padding-bottom:[^;]*;/g, `$1padding-bottom: ${trTB}px;`);

        // need to aprove
        result = result.replace(/<tr\s*(?!height)[^>]*?>\s*<td\s*height="(\d+)"><\/td>\s*<\/tr>/, `<tr><td height="${trTB}"></td></tr>`);
    
        result = result.replace(/<tr\s*(?!height)[^>]*?>\s*<td\s*height="(\d+)"><\/td>\s*<\/tr>(?=(?:\s*<tr[^>]*?>\s*<td[^>]*?><\/td>\s*<\/tr>)*\s*<\/table>\s*$)/, `<tr><td height="${trTB}"></td></tr>`);
    }
    

    if (isReplace) {
        result = makeUnique(result);
    }    
    
    return result;
};

export default makeCopy;





// check if image on submit -> find src -> display downl img + input for new src -> replace