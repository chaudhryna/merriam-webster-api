// Using the Merriam-Webster API 
// sound files at
// https://media.merriam-webster.com/audio/prons/en/us/mp3/v/volumi02.mp3
const token = config.MY_API_TOKEN
const wordEntry = document.querySelector('.wordEntry');
const syllable = document.querySelector('.syllable');
const definitionOf = document.querySelector('.definition-of');

document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  // get the search term
  choice = document.querySelector('input').value
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${choice}?key=${token}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let word = data[0];
      let entry = word.hwi.hw // the entry
      let hom = word.hom // home
      let fl = word.fl // the word's part of speech
      let pron = word.hwi.prs[0].mw // the syllable
      let soundUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${data[0].hwi.prs[0].sound.audio[0]}/${data[0].hwi.prs[0].sound.audio}.mp3`;

      wordEntry.innerHTML = `${entry}     <span>${fl}</span>`;
      syllable.innerHTML = `<span>\\${pron}</span>`;

      // retreiving the audio file for the entry and playing it when the user clicks the icon
      syllable.innerHTML += `<audio src="${soundUrl}" id="pronounce"></audio>
      <span class="fa-stack" style="vertical-align: top;">
        <i class="fa-solid fa-circle fa-stack-2x"></i>
        <i class="fa-solid fa-volume-high fa-stack-1x fa-inverse" onclick="pronounce.play()"></i>
      </span> <span>\\</span>`;

      definitionOf.innerHTML = `Definition of <span>${entry}</span>`

      data.forEach((word) => {
        
          console.log(`${word.hom}: ${word.fl}
          `);
      });


      // definitions
      // let definitions = data[0].def[0].sseq
      // const ul = document.querySelector('ul')
      // ul.innerHTML = ''

      // for (let i = 0; i < definitions.length; i++) {    
      //   for (let j=0; j<definitions[i].length; j++) {
          
      //     const li = document.createElement('li')
      //     li.innerHTML = `<li>${definitions[i][j][1].sn}${definitions[i][j][1].dt[0][1]}</li>`;
          
      //     ul.appendChild(li)
      //   }
      // }
      })
      
    .catch(err => {
      console.log(`error ${err}`)
    })
  }
