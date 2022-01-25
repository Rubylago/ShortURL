// define generate_url function

function generate_url(url_length){
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  // const length = 5
  
  let collection = []
  let code = ""

  collection = collection.concat(lowerCaseLetters.split(''),upperCaseLetters.split(''),numbers.split(''))
  // console.log(collection) 
  //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
  // 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  // 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A',
  // 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  // 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  // 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2',
  // '3', '4', '5', '6', '7', '8', '9', '0']

  // generate code length

  for(let i = 0; i < url_length; i++){
    let index = Math.floor(Math.random() * collection.length)
    code += collection[index]
  }
  // console.log(code)  //get random 5 strings
  return code
}

// generate_url()
// export function for other files to use
module.exports = generate_url