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

    if (isBGColor) {
        result = result.replace(/(<(?:table|tbody|tr|td|th|div)[^>]*)\s+bgcolor\s*=\s*["']#?(?:[Ff]{3}|[Ff]{6})["']/gi, '$1');
    
        result = result.replace(/background-color\s*:\s*#?(?:[Ff]{3}|[Ff]{6});?/gi, '');
    }
    

    // Previous version link painting
    // if (isColorLink) {
    //     result = result.replace(/<a(?![^>]*class=["']bots["'])\s+([^>]*)style="([^"]*)"/g, (match, otherAttrs, styleAttr) => {
    //         let newStyle = styleAttr;

    //         if (/background-color:[^;]+;/.test(newStyle)) {
    //             newStyle = newStyle.replace(/background-color:[^;]+;/g, `background-color: ${colorLink};`);
    //         } else if (/color:[^;]+;/.test(newStyle)) {
    //             newStyle = newStyle.replace(/color:[^;]+;/g, `color: ${colorLink};`);
    //         } else {
    //             newStyle += ` color: ${colorLink};`;
    //         }

    //         if (/border:[^;]+;/.test(newStyle)) {
    //             newStyle = newStyle.replace(/border:[^;]+;/g, (borderMatch) => {
    //                 return borderMatch.replace(/#[0-9A-Fa-f]{3,6}/g, colorLink);
    //             });
    //         }

    //         if (/background-color:[^;]+;/.test(newStyle)) {
    //             newStyle = newStyle.replace(/background-color:[^;]+;/g, `background-color: ${colorLink}; color: #FFFFFF;`);
    //         }

    //         return `<a ${otherAttrs}style="${newStyle}"`;
    //     });

    //     result = result.replace(/<a(?![^>]*class=["']bots["'])\s+([^>]*)>/g, (match, otherAttrs) => {
    //         return `<a ${otherAttrs}style="color: ${colorLink}; background-color: ${colorLink}; color: #FFFFFF;">`;
    //     });
    // }

    if (isColorLink) {
        result = result.replace(/<a(?![^>]*class=["']bots["'])\s+([^>]*)style="([^"]*)"/g, (match, otherAttrs, styleAttr) => {
            let newStyle = styleAttr.trim();
    
            if (/background-color\s*:\s*[^;]+;/.test(newStyle)) {
                return match;
            }
    
            if (/color\s*:\s*[^;]+;/.test(newStyle)) {
                newStyle = newStyle.replace(/color\s*:\s*[^;]+;/g, `color: ${colorLink};`);
            } else {
                newStyle += ` color: ${colorLink};`;
            }
    
            return `<a ${otherAttrs}style="${newStyle}"`;
        });
    }
    
    
    
    

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
        result = result.replace(/<[^>]+style="[^"]*"/g, (match) => {
            if (/^<a\b/.test(match)) {
                return match;
            }

            match = match.replace(/padding:\s*(\d+)px\s+(\d+)px\s+(\d+)px\s+(\d+)px;/g, (m, top, right, bottom, left) => {
                const newTop = top === '0' ? '0' : `${trTB}`;
                const newBottom = bottom === '0' ? '0' : `${trTB}`;
                return `padding: ${newTop}px 0 ${newBottom}px 0;`;
            });

            match = match.replace(/padding:\s*(\d+)px\s+(\d+)px;/g, (m, topBottom, leftRight) => {
                const newTopBottom = topBottom === '0' ? '0' : `${trTB}`;
                return `padding: 0px 0;`;
            });

            match = match.replace(/padding-left:\s*\d+px\s*;/gi, 'padding-left: 0;');

            match = match.replace(/padding-right:\s*\d+px\s*;/gi, 'padding-right: 0;');

            match = match.replace(/padding-left:\s*\d+px/gi, 'padding-left: 0');

            return match;
        });
    }




    if (isPaddingLR) {
        result = `
            <table ${isBGColor ? `bgcolor="${BGColor}"` : 'bgcolor="#fff"'} width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" >
                <tr>
                    <td style="padding: ${trTB}px ${paddingLR}px;">
                        ${result}
                    </td>
                </tr>
            </table>
        `;
    }

    if (isLineHeight) {
        result = result.replace(/(style="[^"]*)line-height:[^;]*;/g, `$1line-height: ${LineHeight};`);

        result = result.replace(/(style="[^"]*[^;])"/g, `$1; line-height: ${LineHeight}"`);
    }



    if (isLinkUrl) {
        result = result.replace(/urlhere/g, linkUrl);
    }

    function removeEmptySpacingRows(html) {
        html = html.replace(/<tr>\s*<td[^>]*height="(?:20|30)"[^>]*>\s*<\/td>\s*<\/tr>/g, '');

        html = html.replace(/(?:<\/table>\s*)+<tr>\s*<td[^>]*height="(?:20|30)"[^>]*>\s*<\/td>\s*<\/tr>\s*<\/table>/, '</table>');

        return html;
    }

    result = removeEmptySpacingRows(result);

    if (isDeleteLift) {
        result = result.replace(/lift.*?\.html/g, '');
    }

    if (isBotLink) {
        result = botsLink(result, botUrl);
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

    if (isAddHidden) {
        result = addHiddenBlock(result);
    }



    return result;
};

export default makeCopy;

