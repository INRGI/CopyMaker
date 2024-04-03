
import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { editDomain } from "../../redux/domainSlice";


const FormPromo = () => {
    const { domainId } = useParams();
    const domain = useSelector(state => state.domains.find(domain => domain.id === domainId));

    const [isFontSize, setFontSize] = useState(domain.isFontSize);
    const [isFontFamily, setFontFamily] = useState(domain.isFontFamily);
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    const dispatch = useDispatch();
    const fontSizeId = nanoid();
    const fontFamilyId = nanoid();

    const initialValues = {
        fontSize: "",
        fontFamily: "",
        ...domain
      };
      

    const handleSubmit = (values) => {
        dispatch(editDomain({ id: domainId, values: {...values, isFontSize, isFontFamily} }));
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

                    <Field type="text" name="fontSize" id={fontSizeId} placeholder="fontSize" disabled={!isFontSize}/>
                </div>

                <div>
                    <label>
                        <input type="checkbox" checked={isFontFamily} onChange={() => setFontFamily((prev) => !prev)}/>
                        Font Family
                    </label>

                    <Field type="text" name="fontFamily" id={fontFamilyId} placeholder="fontFamily" disabled={!isFontFamily}/>
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