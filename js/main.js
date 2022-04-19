// Using the Merriam-Webster API 
// 898738b8-729d-4022-b3bd-e4a021ed00b2
// https://media.merriam-webster.com/audio/prons/en/us/mp3/v/volumi02.mp3

document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  
  choice = document.querySelector('input').value
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${choice}?key=898738b8-729d-4022-b3bd-e4a021ed00b2`

  console.log(url)

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      document.querySelector('.wordEntry').innerHTML = `${data[0].id}     <span>${data[0].fl}</span>`
      document.querySelector('.syllable').innerHTML = `<span>${data[0].hwi.hw} | /${data[0].hwi.prs[0].mw}/</span>`

      document.querySelector('.syllable').innerHTML += `<audio src="https://media.merriam-webster.com/audio/prons/en/us/mp3/${data[0].hwi.prs[0].sound.audio[0]}/${data[0].hwi.prs[0].sound.audio}.mp3" id="pronounce"></audio><i class="fa-solid fa-volume-high" onclick="pronounce.play()"></i>`


    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}
