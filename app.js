document.addEventListener('DOMContentLoaded', () => {
  
  sunburst = document.getElementById('tester')

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
    }];
    
    const layout = {
      margin: {l: 0, r: 0, b: 0, t: 0},
      width: 370,
      height: 370,
      sunburstcolorway:["#363a3f","#62676d","#484a4c","#a6a7a8"],
    };
    
    
    Plotly.newPlot('sunburst', data, layout, {showSendToCloud:true})

})


