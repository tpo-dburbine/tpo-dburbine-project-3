// set focus on text field
document.querySelector('#name').focus()

// -----------------------------------------------------------------------------------------------------------------
// GLOBAL VARIABLES
// -----------------------------------------------------------------------------------------------------------------
const nameField = document.querySelector('#name')
const form = document.querySelector('form')
const jobRole = document.querySelector('#title')
const otherJobRole = document.querySelector('#other-job-role')
const shirtDesign = document.querySelector('#design')
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
payType.children[1].selected = true
paypal.style.display = 'none'
bitcoin.style.display = 'none'

// -----------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------------------------------------------

// check for validity of name
function validName () {
  const nameInput = nameField.value
  const regName = /^[A-Za-z]+ ?[A-Za-z]*?$/.test(nameInput)
  const nameAlert = document.querySelector('#name-hint')

  if (!regName) {
    nameAlert.parentElement.classList.remove('valid')
    nameAlert.parentElement.classList.add('not-valid')
    nameAlert.classList.remove('hint')
  } else if (regName) {
    nameAlert.classList.remove('not-valid')
    nameAlert.classList.add('valid')
    nameAlert.classList.add('hint')
  }
  return regName
}

// check for validity of email field (conditional added for extra credit)
function validEmail () {
  const emailInput = emailAddress.value
  const regEmail = /[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput)
  const emailAlert = document.querySelector('#email-hint')

  if (!regEmail) {
    if (emailInput === '') {
      emailAlert.textContent = 'Oops! Email address field was left blank.'
    } else {
      emailAlert.textContent = 'Oops! Email address is incomplete/must be formatted properly.'
    }
    emailAlert.parentElement.classList.remove('valid')
    emailAlert.parentElement.classList.add('not-valid')
    emailAlert.classList.remove('hint')
  } else if (regEmail) {
    emailAlert.parentElement.classList.remove('not-valid')
    emailAlert.parentElement.classList.add('valid')
    emailAlert.classList.add('hint')
  }
  return regEmail
}

// check validity of activities
function validActivities () {
  let checkedNum = 0
  let activitiesValid
  const activitiesAlert = document.querySelector('#activities-hint')

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

  if (!activitiesValid) {
    activitiesAlert.parentElement.classList.remove('valid')
    activitiesAlert.parentElement.classList.add('not-valid')
    activitiesAlert.classList.remove('hint')
  } else if (activitiesValid) {
    activitiesAlert.parentElement.classList.remove('not-valid')
    activitiesAlert.parentElement.classList.add('valid')
    activitiesAlert.classList.add('hint')
  }
  return activitiesValid
}

// check for validity of CC number
function validCCNumber () {
  const creditNumInput = creditCardNumber.value
  const regCreditNum = /^\d{13}\d?\d?\d?$/.test(creditNumInput)
  const cardNumAlert = document.querySelector('#cc-hint')

  if (!regCreditNum) {
    cardNumAlert.parentNode.classList.remove('valid')
    cardNumAlert.parentNode.classList.add('not-valid')
    cardNumAlert.classList.remove('hint')
  } else if (regCreditNum) {
    cardNumAlert.parentNode.classList.remove('not-valid')
    cardNumAlert.parentNode.classList.add('valid')
    cardNumAlert.classList.add('hint')
  }
  return regCreditNum
}

// check for validity of zip code
function validZipCode () {
  const zipCodeInput = zipCode.value
  const regZipCode = /^\d{5}$/.test(zipCodeInput)
  const zipCodeAlert = document.querySelector('#zip-hint')

  if (!regZipCode) {
    zipCodeAlert.parentNode.classList.remove('valid')
    zipCodeAlert.parentNode.classList.add('not-valid')
    zipCodeAlert.classList.remove('hint')
  } else if (regZipCode) {
    zipCodeAlert.parentNode.classList.remove('not-valid')
    zipCodeAlert.parentNode.classList.add('valid')
    zipCodeAlert.classList.add('hint')
  }
  return regZipCode
}

// check for validity of CVV number
function validCVV () {
  const cvvInput = cvv.value
  const regCVV = /^\d{3}$/.test(cvvInput)
  const cvvAlert = document.querySelector('#cvv-hint')

  if (!regCVV) {
    cvvAlert.parentNode.classList.remove('valid')
    cvvAlert.parentNode.classList.add('not-valid')
    cvvAlert.classList.remove('hint')
  } else if (regCVV) {
    cvvAlert.parentNode.classList.remove('not-valid')
    cvvAlert.parentNode.classList.add('valid')
    cvvAlert.classList.add('hint')
  }
  return regCVV
}

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

// event listener to show specific color options for shirt design chosen
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

// event listener to process activities chosen and add price to total cost/compare times
// and disable if other checkboxes if they conflict with chosen activity
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

//  event listener to remove pay methods based on which is selected
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

// set focus to chosen activity and also remove if another checkbox is clicked
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

// event listener for form validation and prevents submit if 1 or more fields is not valid
form.addEventListener('submit', (e) => {
  const validChecker = []

  validChecker.push(validName())
  validChecker.push(validEmail())
  validChecker.push(validActivities())

  if (payType.value === 'credit-card') {
    validChecker.push(validCCNumber())
    validChecker.push(validZipCode())
    validChecker.push(validCVV())
  }

  if (validChecker.includes(false)) {
    e.preventDefault()
  }
})

// dynamically check validity of email with keyup event listener
emailAddress.addEventListener('keyup', () => {
  validEmail()
})
