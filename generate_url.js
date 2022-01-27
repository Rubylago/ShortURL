// define generate_url function

function generate_url(url_length){
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // const length = 5

  const str =  lowerCaseLetters + upperCaseLetters + numbers
  let code =""

  // generate code length

  for(let i = 0; i < url_length; i++){
    const index = Math.floor(Math.random() * str.length)
    code += str.charAt(index)
  }
  // console.log(code)  //get random 5 strings
  return code
}

// generate_url()
// export function for other files to use
module.exports = generate_url