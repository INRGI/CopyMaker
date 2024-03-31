
import { useState } from "react";
import { Formik, Form } from 'formik';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";

const FormPromo = () => {
    const [isFontSize, setFontSize] = useState(true);
    const [isFontFamily, setFontFamily] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();
    const fontSizeId = nanoid();
    const fontFamilyId = nanoid();

    const { domainId } = useParams();
    const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

    const initialValues = domain;

    const handleSubmit = (values) => {
        
        dispatch(editDomain({ id: domainId, values: values }));
        setIsSubmitted(true);
    };

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validateOnBlur={false}
            validateOnChange={false}
        >
            <Form>
                <div>
                    <label>
                        <input type="checkbox" checked={isFontSize} onChange={() => setFontSize((prev) => !prev)}/>
                        Font Size
                    </label>

                    <input id={fontSizeId} name="fontSize" type="text" disabled={!isFontSize}/>
                </div>

                <div>
                    <label>
                        <input type="checkbox" checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)}/>
                        Font Family
                    </label>

                    <input id={fontFamilyId} name="fontFamily" type="text" disabled={!isFontFamily}/>
                </div>
                
                <div>
                    <input type="text" placeholder="Paste your copy here :)" />
                    <button type="submit">Submit</button>
                </div>

                {isSubmitted && (
                    <div>
                        <p>Here will be output</p>
                    </div>
                )}
                
                </Form>  
        </Formik>
    )
}

export default FormPromo;


// Font size, Font family, color link, paddings, width,