document.addEventListener('DOMContentLoaded', () => {  

  // Produce sunburst
  const data = [{
    type: 'sunburst',
    labels: [
              'TECH', 'Front-End', 'Back-End', 'Version-Control', 'Methodologies', 'JavaScript', 
              'React', 'jQuery', 'HTML5', 'CSS3', 'SCSS', 'Webpack', 'Bulma', 'Plotly.js', 'Chart.js',
              'Python', 'Node.js', 'FRAMEWORKS', 'Flask', 'Express', 'Mongoose', 'DATABASE', 'PostgreSQL', 'MongoDB',
              'Git', 'Github', 'Heroku', 'CLI', 'Bash', 'npm', 'Yarn', 'Homebrew', 'pip3',
              'Agile', 'REST', 'CRUD', 'TESTING', 'Mocha', 'Chai'
            ],
    parents: [
              '', 'TECH', 'TECH', 'TECH', 'TECH', 'Front-End', 'Front-End', 'Front-End', 'Front-End', 'Front-End', 'Front-End',
              'Front-End', 'Front-End', 'Front-End', 'Front-End', 'Back-End', 'Back-End', 'Back-End', 'FRAMEWORKS', 'FRAMEWORKS', 
              'FRAMEWORKS', 'Back-End', 'DATABASE', 'DATABASE', 'DATABASE', 'Version-Control', 'Version-Control', 'Version-Control', 
              'Version-Control', 'CLI', 'CLI', 'CLI', 'CLI', 'Methodologies', 'Methodologies', 'Methodologies', 'Methodologies', 'TESTING', 'TESTING'
            ],
    outsidetextfont: {size: 30, color: 'grey'},
    leaf: {opacity: 0.4},
    marker: {line: {width: 2}},
    }]
    
  const layout = {
    margin: {l: 0, r: 0, b: 0, t: 0},
    width: 370,
    height: 370,
    sunburstcolorway:["#363a3f","#62676d","#484a4c","#a6a7a8"]
  }
    
    
  Plotly.newPlot('sunburst', data, layout, {showSendToCloud:true})

  // Particles.js

  particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":840}},
  "color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},
  "image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,
  "opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},
  "line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.37089939156716817,"width":1},"move":{"enable":true,"speed":2,
  "direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,
  "rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,
  "mode":"push"},"resize":true},"modes":{"grab":{"distance":245.6511250891643,"line_linked":{"opacity":0.34486156271553847}},
  "bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},
  "push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true})
  
 


}) // DOM CLOSE


