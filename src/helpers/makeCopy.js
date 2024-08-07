import addHiddenBlock from "./addHidenBlock";
import botsLink from "./botsLink";
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
    isDeleteLift,
    isLinkUrl,
    linkUrl,
    isTrTB,
    trTB,
    isBGColor,
    BGColor,
    isAddHidden,
    isLineHeight,
    LineHeight,
    isBotLink,
    botUrl,
}) => {
    let result = submit;

    // if (isFontSize) {
    //     result = result.replace(/(style="[^"]*)font-size:[^;]*;/g, `$1font-size: ${fontSize}px;`);
    // }

    // Test not changing fs < 13px
    if (isFontSize) {
        result = result.replace(/(style="[^"]*?font-size\s*:\s*)(\d+)px([^;]*;)/g, (match, p1, p2, p3) => {
            let fontSizeValue = parseInt(p2, 10);
            if (fontSizeValue < 13) {
                return match;
            }
            return `${p1}${fontSize}px${p3}`;
        });
    }
    
    
    if (isFontFamily) {
        result = result.replace(/(style="[^"]*)font-family:[^;]*;/g, `$1font-family: ${fontFamily};`);
    }

    if (isColorLink) {
        result = result.replace(/<a(?![^>]*class=["']bots["'])\s+[^>]*style="([^"]*)"/g, (match, styleAttr) => {
            if (styleAttr.includes('color:')) {
                return match.replace(/color:[^;]+;/g, `color: ${colorLink};`);
            } else {
                return match.replace(/(style="[^"]*)"/, `$1;color: ${colorLink};"`);
            }
        });
    }
    
        

    // if (isWidth) {
    //     result = result.replace(/(?<!<(img|a)[^>]*?)(max-width|width)\s*:\s*(?!100%\s*;)(\d+%?)(?!px)/g, (match, p1, p2) => {
    //         return match.includes('100%') ? match : `${p2}: ${width}px`;
    //     });

    //     result = result.replace(/(\d{1,3})px0px/g, '$1px');
    // }
    // Test with 300px
    if (isWidth) {
        result = result.replace(/(?<!<(img|a)[^>]*?)(max-width|width)\s*:\s*(?!100%\s*;)(\d+)(px|%)/g, (match, p1, p2, p3, p4) => {
            let value = parseInt(p3, 10);
            if (p4 === 'px' && value < 300) {
                return match;
            }
            return match.includes('100%') ? match : `${p2}: ${width}px`;
        });
    
        result = result.replace(/(\d{1,3})px0px/g, '$1px');
    }
    

    

    if (isReplace) {
        result = result.replace(/<\/?(i|em)>/g, "");

        result = makeUnique(result);
    }  
    
    if (isTrTB) {
        result = result.replace(/padding:\s*(\d+)px\s+(\d+)px\s+(\d+)px\s+(\d+)px;/g, (match, top, right, bottom, left) => {
            const newTop = top === '0' ? '0' : `${trTB}`;
            const newBottom = bottom === '0' ? '0' : `${trTB}`;
            return `padding: ${newTop}px 0 ${newBottom}px 0;`;
        });

        result = result.replace(/padding:\s*(\d+)px\s+(\d+)px;/g, (match, topBottom, leftRight) => {
            const newTopBottom = topBottom === '0' ? '0' : `${trTB}`;
            // return `padding: ${newTopBottom}px 0;`;
            return `padding: 0px 0;`;
        });

        result = result.replace(/padding-left:\s*\d+px\s*;/gi, 'padding-left: 0;');
        result = result.replace(/padding-right:\s*\d+px\s*;/gi, 'padding-right: 0;');

        result = result.replace(/padding-left:\s*\d+px/gi, 'padding-left: 0');
    }

    if (isPaddingLR) {
        result = `
            <table bgcolor="#fff" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" >
                <tr>
                    <td style="padding: ${trTB}px ${paddingLR}px;">
                        ${result}
                    </td>
                </tr>
            </table>
        `;
    }
    
    
    
    
    
    
    if(isLineHeight){
        result = result.replace(/(style="[^"]*)line-height:[^;]*;/g, `$1line-height: ${LineHeight};`);
        
        result = result.replace(/(style="[^"]*[^;])"/g, `$1; line-height: ${LineHeight}"`);
    }
    
    

    if (isLinkUrl) {
        result = result.replace(/urlhere/g, linkUrl);
    }    




    // TEST REMOVE TR
    function removeEmptySpacingRows(html) {
        html = html.replace(/<tr>\s*<td[^>]*height="(?:20|30)"[^>]*>\s*<\/td>\s*<\/tr>/g, '');

    html = html.replace(/(?:<\/table>\s*)+<tr>\s*<td[^>]*height="(?:20|30)"[^>]*>\s*<\/td>\s*<\/tr>\s*<\/table>/, '</table>');

    return html;
    }

    result = removeEmptySpacingRows(result);

    
    
    if (isBGColor) {
        result = result.replace(/<(table|tbody)([^>]*)\s+bgcolor\s*=\s*["']([^"']*)["']([^>]*)>/g, (match, tag, beforeAttrs, oldBGColor, afterAttrs) => {
            return `<${tag}${beforeAttrs} bgcolor="${BGColor}"${afterAttrs}>`;
        });
        
        result = result.replace(/background-color\s*:\s*([^;]+);(?![^<]*<\/a>)/g, `background-color: ${BGColor};`);

        result = result.replace(/<(table|tbody)([^>]*)>/g, (match, tag, attrs) => {
            if (attrs.includes('bgcolor')) {
                return match;
            } else {
                return `<${tag}${attrs} bgcolor="${BGColor}">`;
            }
        });
                
    }

    if (isDeleteLift) {
        result = result.replace(/lift.*?\.html/g, '');
    }


      

    // TEST
    if(isBotLink){
        result = botsLink(result, botUrl);
    }
    // TEST

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

    if (isAddHidden) {
        result = addHiddenBlock(result);
    }   

    
    
    return result;
};

export default makeCopy;

