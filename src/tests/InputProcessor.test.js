import createProcessor from '../inputProcessor'

test('basic create test', () => {
  expect(createProcessor().process).toBeDefined()
})
