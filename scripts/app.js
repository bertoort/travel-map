document.addEventListener('DOMContentLoaded', () => {
  const map = initMap()
  map.addListener("init", highlight)
})

function initMap() {
  return AmCharts.makeChart( "chartdiv", {
    "type": "map",
    "theme": "dark",
    "projection": "miller",

    "dataProvider": {
      "map": "worldLow",
      "getAreasFromMap": true
    }
  })
}

function highlight() {
  document.querySelector('.amcharts-chart-div > a').style.display = 'none';

  fetch('/map.json').then(data => data.json())
    .then(map => {
      createLegend()
      Object.keys(map).forEach(category => {
        map[category].countries.forEach(country => {
          const countryElement = document.querySelector(`path[aria-label="${country}  "`)
          if (countryElement) {
            countryElement.classList.add(category)
          }
        })
        addLegend(category)
        applyColor(category, map[category].color)
      })
    })
}

function createLegend() {
  const section = document.createElement('section')
  section.classList.add('legend')
  document.querySelector('#chartdiv').appendChild(section)
}

function addLegend(category) {
  const legend = document.querySelector('.legend')  
  const label = document.createElement('p')
  const key = document.createElement('section')

  label.innerText = category
  key.classList.add('key')
  key.classList.add(category)
  key.appendChild(label)
  legend.appendChild(key)
}

function applyColor(category, color) {
  const countries = document.querySelectorAll(`.${category}`)
  countries.forEach(country => {
    country.style.fill = color
    country.style.borderColor = color
  })
}
