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
const registerForActivities = document.querySelector('#activities')
const totalCost = document.querySelector('#activities-cost')
const payType = document.querySelector('#payment')
const creditCard = document.querySelector('#credit-card')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
let sumOfCost = 0
otherJobRole.style.display = 'none'
shirtColor.style.display = 'none'
paypal.style.display = 'none'
bitcoin.style.display = 'none'

payType.children[1].selected = true

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

registerForActivities.addEventListener('change', (e) => {
  const dataCost = e.target
  const activityCost = +dataCost.getAttribute('data-cost')

  if (dataCost.checked) {
    sumOfCost += activityCost
  } else {
    sumOfCost -= activityCost
  }
  totalCost.innerHTML = `Total: $${sumOfCost}`
})

payType.addEventListener('change', (e) => {
  const paymentInput = e.target.value

  if (paymentInput === creditCard.id) {
    creditCard.style.display = 'block'
    paypal.style.display = 'none'
    bitcoin.style.display = 'none'
  } else if (paymentInput === paypal.id) {
    paypal.style.input = 'block'
    creditCard.style.display = 'none'
    bitcoin.style.display = 'none'
  } else if (paymentInput === bitcoin.id) {
    bitcoin.style.display = 'block'
    creditCard.style.display = 'none'
    paypal.style.display = 'none'
  }
})
