import { Markdown } from "./Markdown";

declare global {
    interface Window {
        $: JQueryStatic;
    }
}

window.$ = require("jquery");

describe("Markdown component tests",()=>{
    it("renders the component with the correct output",()=>{
        const inputElement = $("<input type=\"text\" />") as JQuery<HTMLInputElement>;
        inputElement.val("# Hello World");
        const outputElement = $("<div></div>");
        new Markdown(inputElement, outputElement);
        inputElement.trigger("keyup");
        expect(outputElement.html().trim()).toBe("<h1>Hello World</h1>");
    });
});
