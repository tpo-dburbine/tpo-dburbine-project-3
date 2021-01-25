// set focus on text field
const focusText = document.querySelector('#name')
focusText.focus()

// -----------------------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
// -----------------------------------------------------------------------------------------------------------------

const jobRole = document.querySelector('#title')
const otherJobRole = document.querySelector('#other-job-role')
const shirtDesign = document.querySelector('#design')
const shirtColor = document.querySelector('#shirt-colors')
const colorOptions = document.querySelector('#color')
otherJobRole.style.display = 'none'
shirtColor.style.display = 'none'

// -----------------------------------------------------------------------------------------------------------------
// EVENT LISTENERS
// -----------------------------------------------------------------------------------------------------------------

// event listener: if job selection is 'other'
jobRole.addEventListener('change', (e) => {
  if (e.target.value === 'other') {
    otherJobRole.style.display = 'block'
  } else {
    otherJobRole.style.display = 'none'
  }
})

shirtDesign.addEventListener('change', (e) => {
  shirtColor.style.display = 'block'

  if (e.target.value === 'heart js') {
    for (let i = 0; i < colorOptions.length; i++) {
      const theme = colorOptions[i].getAttribute('data-theme')

      if (theme === e.target.value) {
        colorOptions[i].style.display = 'block'
        colorOptions[i].selected = true
      } else {
        colorOptions[i].style.display = 'none'
      }
    }
  } else if (e.target.value === 'js puns') {
    for (let i = 0; colorOptions.length; i++) {
      const theme = colorOptions[i].getAttribute('data-theme')

      if (theme === e.target.value) {
        colorOptions[i].style.display = 'block'
        colorOptions[i].selected = true
      } else {
        colorOptions[i].style.display = 'none'
      }
    }
  }
})
