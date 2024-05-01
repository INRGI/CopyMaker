import { Container, ContentContainer, Empty } from "./Preview.styled";

const Preview = ({result}) =>{

    const prew = result.replace(/(?<!<(img|a)[^>]*?)(max-width|width)\s*:\s*(?!100%\s*;)(\d+%?)(?!px)/g, `$2: 360px`).replace(/(\d{1,3})px0px/g, '$1px');
        
    return (
        <Container>
            {result === "" ? (<Empty>Preview</Empty>):(<ContentContainer dangerouslySetInnerHTML={{ __html: prew }} />)}
        </Container>
    )
}

export default Preview;