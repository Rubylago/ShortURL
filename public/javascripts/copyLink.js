function copyLink(){

  console.log('function on')
  const copy = document.querySelector('#copyLink').innerText

  // Copy
  navigator.clipboard.writeText(copy)
    .then(() => {
      console.log('Link copied')
      alert('Link copied')
    })
    .catch((error) => console.log(error))
}