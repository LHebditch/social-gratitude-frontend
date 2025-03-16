import { reorderIcons, Icon } from "."

type ReorderTestInput = {
    input: Icon[],
    active: Icon,
    expected: Icon[]

}
describe('icon navigation', () => {
    describe('icon reordering', () => {
        it.each<ReorderTestInput>([
            { input: ['journal', 'home', 'social'], active: 'home', expected: ['journal', 'home', 'social'] },
            { input: ['journal', 'home', 'social'], active: 'social', expected: ['home', 'social', 'journal'] },
            { input: ['journal', 'home', 'social'], active: 'journal', expected: ['social', 'journal', 'home'] }
        ])('should correctly reorder', (t) => {
            const icons = reorderIcons(t.input, t.active)
            expect(icons).toEqual(t.expected)
        })
    })
})