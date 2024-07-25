
// const botsLink = (htmlText, url) => {
//     const linkRegex = new RegExp(`class="bots"`, 'i');
//     if (linkRegex.test(htmlText)) {
//         return htmlText;
//     }

//     const wrapWithLink = (content) => `<a class="bots" href="${url}" style="color:#000000; text-decoration: none;">${content}</a>`;

//     let updatedText = htmlText.replace(/\.(?![^<]*>)/, wrapWithLink('.'));
//     if (updatedText !== htmlText) {
//         return updatedText;
//     }

//     updatedText = htmlText.replace(/,(?![^<]*>)/, wrapWithLink(','));
//     if (updatedText !== htmlText) {
//         return updatedText;
//     }

//     updatedText = htmlText.replace(/(?<!<a[^>]*?>)\b(\w+)\b(?!<\/a>)/, wrapWithLink('$1'));
//     return updatedText;
// };

//   export default botsLink;


const botsLink = (htmlText, url) => {
    const linkRegex = new RegExp(`class="bots"`, 'i');
    if (linkRegex.test(htmlText)) {
        return htmlText;
    }

    const wrapWithLink = (content) => `<a class="bots" href="${url}" style="color:#000000; text-decoration: none;">${content}</a>`;

    let updatedText = htmlText.replace(/(\.)(?![^<>]*>)(?![^<>]*<\/a>)(?=[^<>]*(<|$))/, (match, p1) => wrapWithLink(p1));
    if (updatedText !== htmlText) {
        return updatedText;
    }

    updatedText = htmlText.replace(/(,)(?![^<>]*>)(?![^<>]*<\/a>)(?=[^<>]*(<|$))/, (match, p1) => wrapWithLink(p1));
    if (updatedText !== htmlText) {
        return updatedText;
    }

    updatedText = htmlText.replace(/(?<!<a[^>]*?>)(\b\w+\b)(?!<\/a>)(?![^<>]*>)(?=[^<>]*(<|$))/, (match, p1) => wrapWithLink(p1));
    return updatedText;
};

export default botsLink;
