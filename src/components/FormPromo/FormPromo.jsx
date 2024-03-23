
import { useState } from "react";


const FormPromo = () => {
    const [isFontSize, setFontSize] = useState(true);
    const [isFontFamily, setFontFamily] = useState(true);


    return (
        <>  
            <div>
                <label>
                    <input type="checkbox" checked={isFontSize} onChange={() => setFontSize((prev) => !prev)}/>
                    Font Size
                </label>

                <input type="text" disabled={!isFontSize}/>
            </div>

            <div>
                <label>
                    <input type="checkbox" checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)}/>
                    Font Family
                </label>

                <input type="text" disabled={!isFontFamily}/>
            </div>
            
        </>
    )
}

export default FormPromo;


// Font size, Font family, color link, paddings, width,