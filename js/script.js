// set focus on text field
const nameField = document.querySelector('#name')
nameField.focus()

// -----------------------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
// -----------------------------------------------------------------------------------------------------------------

const form = document.querySelector('form')
const jobRole = document.querySelector('#title')
const otherJobRole = document.querySelector('#other-job-role')
const shirtDesign = document.querySelector('#design')
// const shirtColor = document.querySelector('#shirt-colors')
const colorOptions = document.querySelector('#color')
const registerForActivities = document.querySelector('#activities')
const checkboxes = document.querySelectorAll('input[type=checkbox]')
const totalCost = document.querySelector('#activities-cost')
const payType = document.querySelector('#payment')
const creditCard = document.querySelector('#credit-card')
const creditCardNumber = document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
const emailAddress = document.querySelector('#email')

let sumOfCost = 0
otherJobRole.style.display = 'none'
colorOptions.disabled = true
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
  colorOptions.disabled = false

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
  const clickedActivity = e.target
  const activityCost = +clickedActivity.getAttribute('data-cost')
  const activityTime = clickedActivity.getAttribute('data-day-and-time')

  for (let i = 0; i < checkboxes.length; i++) {
    const conflictingTime = checkboxes[i].getAttribute('data-day-and-time')

    if (clickedActivity !== checkboxes[i] && activityTime === conflictingTime) {
      checkboxes[i].disabled = true

      if (clickedActivity.checked) {
        checkboxes[i].disabled = true
        checkboxes[i].parentElement.classList.add('disabled')
      } else {
        checkboxes[i].disabled = false
        checkboxes[i].parentElement.classList.remove('disabled')
      }
    }
  }

  if (clickedActivity.checked) {
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

form.addEventListener('submit', (e) => {
  const nameInput = nameField.value
  const emailInput = emailAddress.value
  const creditNumInput = creditCardNumber.value
  const zipCodeInput = zipCode.value
  const cvvInput = cvv.value

  const regName = /^[A-Za-z]+ ?[A-Za-z]*?$/.test(nameInput)
  const regEmail = /[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput)
  const regCreditNum = /^\d{13}\d?\d?\d?$/.test(creditNumInput)
  const regZipCode = /^\d{5}$/.test(zipCodeInput)
  const regCVV = /^\d{3}$/.test(cvvInput)

  let checkedNum = 0
  let activitiesValid

  const nameAlert = document.querySelector('#name-hint')
  const emailAlert = document.querySelector('#email-hint')
  const activitiesAlert = document.querySelector('#activities-hint')
  const cardNumAlert = document.querySelector('#cc-hint')
  const zipCodeAlert = document.querySelector('#zip-hint')
  const cvvAlert = document.querySelector('#cvv-hint')

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkedNum++
    }
  }

  if (checkedNum > 0) {
    activitiesValid = true
  } else {
    activitiesValid = false
  }

  if (payType.value === 'credit-card') {
    if (!regCreditNum) {
      cardNumAlert.parentNode.classList.remove('valid')
      cardNumAlert.parentNode.classList.add('not-valid')
      cardNumAlert.classList.remove('hint')
      e.preventDefault()
    } else if (regCreditNum) {
      cardNumAlert.parentNode.classList.remove('not-valid')
      cardNumAlert.parentNode.classList.add('valid')
      cardNumAlert.classList.add('hint')
    }
    if (!regZipCode) {
      zipCodeAlert.parentNode.classList.remove('valid')
      zipCodeAlert.parentNode.classList.add('not-valid')
      zipCodeAlert.classList.remove('hint')
      e.preventDefault()
    } else if (regZipCode) {
      zipCodeAlert.parentNode.classList.remove('not-valid')
      zipCodeAlert.parentNode.classList.add('valid')
      zipCodeAlert.classList.add('hint')
    }
    if (!regCVV) {
      cvvAlert.parentNode.classList.remove('valid')
      cvvAlert.parentNode.classList.add('not-valid')
      cvvAlert.classList.remove('hint')
      e.preventDefault()
    } else if (regCVV) {
      cvvAlert.parentNode.classList.remove('not-valid')
      cvvAlert.parentNode.classList.add('valid')
      cvvAlert.classList.add('hint')
    }
  }

  if (!regName) {
    nameAlert.parentElement.classList.remove('valid')
    nameAlert.parentElement.classList.add('not-valid')
    nameAlert.classList.remove('hint')
    e.preventDefault()
  } else if (regName) {
    nameAlert.classList.remove('not-valid')
    nameAlert.classList.add('valid')
    nameAlert.classList.add('hint')
  }
  if (!regEmail) {
    if (emailInput === '') {
      emailAlert.textContent = 'Oops! Email address field was left blank.'
    } else {
      emailAlert.textContent = 'Oops! Email address in incomplete/must be formatted properly.'
    }
    emailAlert.parentElement.classList.remove('valid')
    emailAlert.parentElement.classList.add('not-valid')
    emailAlert.classList.remove('hint')
    e.preventDefault()
  } else if (regEmail) {
    emailAlert.parentElement.classList.remove('not-valid')
    emailAlert.parentElement.classList.add('valid')
    emailAlert.classList.add('hint')
  }
  if (!activitiesValid) {
    activitiesAlert.parentElement.classList.remove('valid')
    activitiesAlert.parentElement.classList.add('not-valid')
    activitiesAlert.classList.remove('hint')
    e.preventDefault()
  } else if (activitiesValid) {
    activitiesAlert.parentElement.classList.remove('not-valid')
    activitiesAlert.parentElement.classList.add('valid')
    activitiesAlert.classList.add('hint')
  }
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('focus', (e) => {
    const parentFocused = e.target.parentNode
    parentFocused.classList.add('focus')
  })
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('blur', (e) => {
    const parentBlurred = e.target.parentNode
    parentBlurred.classList.remove('focus')
  })
})
