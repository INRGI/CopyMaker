
const botsLink = (htmlText, url) => {
    // const linkRegex = new RegExp(`<a\\s+class=["']bots["']\\s+href=["']${url}["']\\s+style=["'][^"']*text-decoration:\\s*none;[^"']*["']>.*?<\\/a>`, 'i');
    const linkRegex = new RegExp(`class="bots"`, 'i');
    if (linkRegex.test(htmlText)) {
        return htmlText;
    }

    const wrapWithLink = (content) => `<a class="bots" href="${url}" style="color:#000000; text-decoration: none;">${content}</a>`;

    let updatedText = htmlText.replace(/\.(?![^<]*>)/, wrapWithLink('.'));
    if (updatedText !== htmlText) {
        return updatedText;
    }

    updatedText = htmlText.replace(/,(?![^<]*>)/, wrapWithLink(','));
    if (updatedText !== htmlText) {
        return updatedText;
    }

    updatedText = htmlText.replace(/(?<!<a[^>]*?>)\b(\w+)\b(?!<\/a>)/, wrapWithLink('$1'));
    return updatedText;
};

  export default botsLink;