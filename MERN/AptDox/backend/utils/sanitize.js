import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'


// create window
const window = new JSDOM('').window
// pass windoe to dompurifier
const DOMPurify = createDOMPurify(window);


export const sanitize = (dirtyInput)=>{
    return DOMPurify.sanitize(dirtyInput);
}