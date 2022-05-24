const HR = require('./hr.js')

describe('HR.js', () => {
  test('highlight backgroundColor should match', async () => {
    const defaultText = 'lorem ipsum dolor sit amet.'
    document.body.innerHTML = `<p id="test-1">${defaultText}</p>`

    new HR('#test-1', {
      highlight: defaultText
    }).hr()

    const testElement = document.getElementById('test-1')
    expect(testElement.children[0].style.backgroundColor).toBe('rgb(255, 222, 112)')
  })

  test('replaceWith & backgroundColor values should match', async () => {
    const defaultText = 'black'
    const replacedText = 'white'
    document.body.innerHTML = `<p id="test-2">${defaultText}</p>`

    new HR('#test-2', {
      highlight: defaultText,
      replaceWith: replacedText,
      backgroundColor: 'rgb(180, 255, 235)'
    }).hr()

    const testElement = document.getElementById('test-2')
    expect(testElement.textContent).toBe(replacedText)
    expect(testElement.children[0].style.backgroundColor).toBe('rgb(180, 255, 235)')
  })

  test('array of items replace should match', async () => {
    const defaultText = 'cat bird'
    const replacedText = 'dog unicorn'
    document.body.innerHTML = `<p id="test-3">${defaultText}</p>`

    new HR('#test-3', {
      highlight: defaultText.split(' '),
      replaceWith: replacedText.split(' '),
      backgroundColor: 'rgb(0, 255, 235)'
    }).hr()

    const testElement = document.getElementById('test-3')
    expect(testElement.textContent.trim()).toBe(replacedText)
  })
})
