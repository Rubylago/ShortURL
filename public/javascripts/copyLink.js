function copyLink(){

  console.log('function on')
  const copyText = document.querySelector('#copyText').innerText
  navigator.clipboard.writeText(copyText) // 將copyText寫入剪貼簿
    .then(() => {
      console.log('內容已複製')
      alert('內容已複製')
    })
    .catch((error) => {
      console.log(error)
    })
}