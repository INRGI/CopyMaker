const addHiddenBlock = (text) => {

    const generateRandomString = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 1000; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const uniqueBlock = generateRandomString();

    const newText = `<div style="display:none;">${uniqueBlock}</div>${text}<div style="display:none;">${uniqueBlock}</div>`;

    return newText;
};

export default addHiddenBlock;
