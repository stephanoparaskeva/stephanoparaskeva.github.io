document.addEventListener('DOMContentLoaded', () => {
  
  sunburst = document.getElementById('tester')

  const data = [{
      type: "sunburst",
     labels: ["TECH", "Front-end", "JavaScript ES5/ES6", "React", "jQuery", "Back-end", "Python", "Node.js"],
    parents: ["", "TECH", "Front-end", "Front-end", "Front-end","TECH", "Back-end", "Back-end"],
      values:  [10, 14, 12, 10, 2, 6, 6, 4],
      outsidetextfont: {size: 20, color: "#377eb8"},
      leaf: {opacity: 0.4},
      marker: {line: {width: 2}},
    }];
    
    const layout = {
      margin: {l: 0, r: 0, b: 0, t: 0},
      width: 500,
      height: 500
    };
    
    
    Plotly.newPlot('sunburst', data, layout, {showSendToCloud:true})


})