import {updateMarkup, updateMargin} from "./index"

import {default as random} from "../random"

const formatDecorator = num => Math.round(num)

describe("correct loaded", () => {
    it("load markup", ()=> {
        expect(typeof updateMarkup).toEqual("function")
    })
    it("load margin", ()=> {
        expect(typeof updateMargin).toEqual("function")
    })
})

describe("sample tests markup", () => {
    it("14-16", () => {
        expect(formatDecorator(updateMarkup(14))).toEqual(16)
    })
    it("43-75", () => {
        expect(formatDecorator(updateMarkup(43))).toEqual(75)
    })
    it("34-52", () => {
        expect(formatDecorator(updateMarkup(34))).toEqual(52)
    })
})

describe("sample tests margin", () => {
    it("16-14", () => {
        expect(formatDecorator(updateMargin(16))).toEqual(14)
    })
    it("75-43", () => {
        expect(formatDecorator(updateMargin(75))).toEqual(43)
    })
    it("52-34", () => {
        expect(formatDecorator(updateMargin(52))).toEqual(34)
    })
})

describe("random coordinate tests", () => {
    for(let i = 0; i < 50; i++){
        let margin = random(1,100)
        let markup = formatDecorator(updateMarkup(margin))

        it("random test " + i, () => {
            expect(formatDecorator(updateMargin(markup))).toEqual(margin)
        })
    }
})