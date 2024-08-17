const customHiddenBlock = (text, symbols) => {

    const generateRandomString = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < symbols; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const uniqueBlock = generateRandomString();

    const newText = `<table border="0" cellpadding="0" cellspacing="0" class="body" role="presentation" style="display:none; width: 100%" ><tbody><tr><td align="center" valign="top">${uniqueBlock}</td></tr></tbody></table>${text}<table border="0" cellpadding="0" cellspacing="0" class="body" role="presentation" style="display:none; width: 100%" ><tbody><tr><td align="center" valign="top">${uniqueBlock}</td></tr></tbody></table>`;

    return newText;
};

export default customHiddenBlock;