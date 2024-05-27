const randomSentence = (text, words) => {

    const wordList = [
        "fіrеfіghtеr", "dіаmеtеr", "frее", "quоtа", "dіscоurаgе", "tеxt", "chаіn", 
        "оf", "swаllоw", "purе", "funсtіоn", "аrchіtеcturе", 
        "nоrmаl", "vаrіаblе", "sуntаx", "аlgоrіthm", "nіght", 
        "dеsіgn", "pаttеrn", "mоdulе", "lіbrаrу", "frаmеwоrk", "uncеrtаіntу",
        "еquіp",
    ];

    const generateRandomString = () => {
        let result = '';
        const length = words;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            result += wordList[randomIndex] + ' ';
        }

        return result.trim();
    };

    const uniqueBlock = generateRandomString();

    const newText = `
        <table border="0" cellpadding="0" cellspacing="0" class="body" role="presentation" style="display:none; width: 100%">
            <tbody>
                <tr>
                    <td align="center" valign="top">${uniqueBlock}</td>
                </tr>
            </tbody>
        </table>
        ${text}
        <table border="0" cellpadding="0" cellspacing="0" class="body" role="presentation" style="display:none; width: 100%">
            <tbody>
                <tr>
                    <td align="center" valign="top">${uniqueBlock}</td>
                </tr>
            </tbody>
        </table>`;

    return newText;
};

export default randomSentence;
