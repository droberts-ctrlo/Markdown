import { marked } from "marked";

/**
 * Markdown class
 */
class Markdown {
    /** 
     * Create a markdown object with the defined configuration
     * @param {JQuery<HTMLInputElement | HTMLTextAreaElement>} inputElement The input element to get the markdown text from
     * @param {JQuery<HTMLElement>} outputElement The output element to render the markdown text to
    */
    constructor(inputElement, outputElement) {
        this.initMarkdown(inputElement, outputElement);
    }

    /**
     * Render markdown text to HTML
     * @param {string} md The markdown text to render
     * @returns The rendered HTML text
     */
    renderMarkdown(md) {
        return marked($('<span>').text(md).html());
    }

    /**
     * Initialize the markdown preview
     * @param {JQuery<HTMLInputElement | HTMLTextAreaElement>} inputElement The input element to get the markdown text from
     * @param {JQuery<HTMLElement>} outputElement The output element to render the markdown text to
     */
    initMarkdown(inputElement, outputElement) {
        marked.use({breaks: true});

        const $textarea = inputElement;
        const $preview = outputElement;
        if(!$preview.hasClass("markdown-preview")) $preview.addClass("markdown-preview");

        $().on("ready", ()=>{
            if($textarea && $textarea.val() && $textarea.val() !== "") {
                const htmlText = this.renderMarkdown($textarea.val());
                $preview.html(htmlText);
            }
        });
        $textarea.on("keyup", ()=>{
            const mdText = $textarea.val();
            if(!mdText || mdText === "") {
                $preview.html('<p class="text-info">Nothing to preview</p>');
                return;
            }else {
                const htmlText = this.renderMarkdown(mdText);
                $preview.html(htmlText);
            }
        });
    }
}

export default Markdown;