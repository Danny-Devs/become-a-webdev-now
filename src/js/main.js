import '../style.css'

let clicked = false

const clickBtn = document.getElementById('click-btn')
const pTags = document.querySelectorAll('p')
const h1 = document.querySelector('h1')

h1.addEventListener('mouseover', () => {
  h1.style.color = 'purple'
})

h1.addEventListener('mouseout', () => {
  h1.style.color = 'skyblue'
})

clickBtn.addEventListener('click', myClickHandler)


function myClickHandler() {
  if (clicked) {
    pTags.forEach(p => {
      p.style.color = 'pink'
      p.style.fontSize = '20px'
    })
  } else {
    pTags.forEach(p => {
      p.style.color = 'yellowgreen'
      p.style.fontSize = '16px'
    })
  }
  clicked = !clicked
}