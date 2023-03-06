function setup() {
  renderjson.set_icons("⊕", "⊖")

  const tgt = document.getElementById("tgt")
  const file_selector = document.getElementById('file-selector')
  const url_selector = document.getElementById('url-selector')

  function loadTgt(json_ish) {
    if (typeof json_ish === 'string' || json_ish instanceof String) {
      json_ish = JSON.parse(json_ish)
    }
    html = renderjson(json_ish)
    
    tgt.innerHTML = '' // empty 
    tgt.appendChild(html) // and load
  }
  
  function loadTgtFromEvent(event) {
    loadTgt(event.target.result)
  }
  
  function loadTgtFromUrl(submitEvent) {
    url = url_selector.value
    fetch(url)
      .then(resp => resp.json())
      .then(loadTgt)
    return false // Don't do actual submission
  }
  
  file_selector.addEventListener('change', (event) => {
    const reader = new FileReader()
    reader.onload = loadTgtFromEvent
    reader.readAsText(event.target.files[0])
  })
  
  url_selector.parentElement.onsubmit = loadTgtFromUrl

}

window.addEventListener("load", setup, true)