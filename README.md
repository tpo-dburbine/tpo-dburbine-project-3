# tpo-dburbine-project-3


## Conditional Error Message

I added the conditional error message to the email form. When the user leaves the email field blank the message 'Oops! Email address field was left blank.' is shown and if the user inputs something that does not match the proper email format, they receive the error message 'Oops! Email address is incomplete/must be formatted properly.' To accomplish this, inside the function I used to validate the email there is a conditional nested inside the if statement testing if the regex is not valid that tests if the email address value is blank. If it is then the first messsage will display alerting the user the field is blank, the else portion alerts the user the email must be formatted properly

## Real Time Validation

I also added the real time validation to the email field. When the user clicks into the field the message 'Oops! Email address field was left blank.' will be shown to the user. As soon as they start typing out their email address the message will change to 'Oops! Email address is incomplete/must be formatted properly.' To accomplish this, I created another event listener on the email address that listened for keyups and called the function to check email validity when triggered.