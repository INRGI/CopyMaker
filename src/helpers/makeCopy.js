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
    isBGColor,
    BGColor,
}) => {
    let result = submit;


    if (isFontSize) {
        result = result.replace(/(style="[^"]*)font-size:[^;]*;/g, `$1font-size: ${fontSize}px;`);
    }
    
    if (isFontFamily) {
        result = result.replace(/(style="[^"]*)font-family:[^;]*;/g, `$1font-family: ${fontFamily};`);
    }
    
    if (isColorLink) {
        result = result.replace(/<a(?:\s+[^>]*)?\s+style="([^"]*)"/g, (match, styleAttr) => {
            if (styleAttr.includes('color:')) {
                return match.replace(/color:[^;]+;/g, `color: ${colorLink};`);
            } else {
                return match.replace(/(style="[^"]*)"/, `$1;color: ${colorLink};"`);
            }
        });
    }
        

    
    
    if (isWidth) {
        
        // result = result.replace(/(?<!<img[^>]*?)(max-width|width)\s*:\s*(?!100%\s*;)(\d+%?)(?!px)/g, `$1: ${width}px`);
        // result = result.replace(/(\d{1,3})px0px/g, '$1px');
        result = result.replace(/(?<!<(img|a)[^>]*?)(max-width|width)\s*:\s*(?!100%\s*;)(\d+%?)(?!px)/g, `$2: ${width}px`);
        result = result.replace(/(\d{1,3})px0px/g, '$1px');

        
        
        
    }
    

    if (isPaddingLR) {
       
        result = result.replace(/padding-left:\s*\d{1,2}\s*px/g, `padding-left: ${paddingLR}px`)
               .replace(/padding-right:\s*\d{1,2}\s*px/g, `padding-right: ${paddingLR}px`);

    }
    
    
    

    if (isLinkUrl) {
        result = result.replace(/urlhere/g, linkUrl);
    }    

    
    if (isTrTB) {
 
        result = result.replace(/(style="[^"]*)padding-top:[^;]*;/g, `$1padding-top: ${trTB}px;`);
        result = result.replace(/(style="[^"]*)padding-bottom:[^;]*;/g, `$1padding-bottom: ${trTB}px;`);
        // top
        result = result.replace(/(<tr[^>]*>\s*<td[^>]*height=")(\d+)("[^>]*><\/td>\s*<\/tr>)/, `<tr><td height="${trTB}" width="100%"></td></tr>`);

    }
    
    if (isBGColor) {
        result = result.replace(/<(table|tbody)([^>]*)\s+bgcolor\s*=\s*["']([^"']*)["']([^>]*)>/g, (match, tag, beforeAttrs, oldBGColor, afterAttrs) => {
            return `<${tag}${beforeAttrs} bgcolor="${BGColor}"${afterAttrs}>`;
        });
        
        // result = result.replace(/background-color\s*:\s*([^;]+);/g, `background-color: ${BGColor};`);
        result = result.replace(/background-color\s*:\s*([^;]+);(?![^<]*<\/a>)/g, `background-color: ${BGColor};`);

        result = result.replace(/<(table|tbody)([^>]*)>/g, (match, tag, attrs) => {
       
            if (attrs.includes('bgcolor')) {
                return match;
            } else {
                return `<${tag}${attrs} bgcolor="${BGColor}">`;
            }
        });
                
    }
    
    

    if (isReplace) {
        result = makeUnique(result);
    }    

    result = result.replace(/>\s+</g, '><');
    
    function formatHtml(html) {
        const tab = '\t';
        let result = '';
        let indent = '';
    
        html.split(/>\s*</).forEach((element) => {
            if (element.match(/^\/\w/)) {
                indent = indent.substring(tab.length);
            }
    
            result += `${indent}<${element}>\r\n`;
    
            // eslint-disable-next-line no-useless-escape
            if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br')) {
                indent += tab;
            }
        });

    
        return result.trim();
    }

    function removeFirstAndLastCharacter(str) {
        return str.slice(1, -1);
    }

    result = formatHtml(result);
    
    
    result = removeFirstAndLastCharacter(result);
    
    return result;
};

export default makeCopy;





// check if image on submit -> find src -> display downl img + input for new src -> replace