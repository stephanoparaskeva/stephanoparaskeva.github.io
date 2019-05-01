document.addEventListener('DOMContentLoaded', () => {  
  
  // Header animation
  (function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.querySelector('.large-header');
        
        largeHeader.style.height = height+'px';

        canvas = document.querySelector('#network-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        display = width*0.01
        if (width < 1000) {
          display = width*0.025
        }
        for(var x = 0; x < width; x = x + display) {
            for(var y = 0; y < height; y = y + height*0.1) {
                var px = x + Math.random()*width*0.1;
                var py = y + Math.random()*height*0.1;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 7; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 7; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height/10+'vh';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x+1000, p.y+1000);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(73,65,189,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(181,47,47,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();


// Sunburst plotly chart

const data = [{
  type: 'sunburst',
  hoverinfo: 'none',
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
            'FRAMEWORKS', 'Back-End', 'DATABASE', 'DATABASE', 'Version-Control', 'Version-Control', 'Version-Control', 'Version-Control', 
            'Version-Control', 'CLI', 'CLI', 'CLI', 'CLI', 'Methodologies', 'Methodologies', 'Methodologies', 'Methodologies', 'TESTING', 'TESTING'
          ],
  outsidetextfont: {size: 30, color: '#272727'},
  leaf: {opacity: 0.4},
  marker: {line: {width: 2}},
  }]
  
const layout = {
  margin: {l: 0, r: 0, b: 0, t: 0},
  width: 370,
  height: 370,
  sunburstcolorway:["#F2545B","#C47AC0","#DD5E98","#4941bd"],
  paper_bgcolor: '#fefefe'
}
  

Plotly.newPlot('sunburst', data, layout, {showSendToCloud:true})

// Technology
icons = document.querySelectorAll('.tech-icon')

  //javascript
$(icons[0]).hover(
  function() {
  this.style.color = '#e6e01b'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //react
$(icons[1]).hover(
  function() {
  this.style.color = '#679ed2'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //html5
$(icons[2]).hover(
  function() {
  this.style.color = '#d85f40'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //css3
$(icons[3]).hover(
  function() {
  this.style.color = '#3d8fc6'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //d3
$(icons[4]).hover(
  function() {
  this.style.color = '#d28347'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //jQuery
$(icons[5]).hover(
  function() {
  this.style.color = '#1c4663'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //heroku
$(icons[6]).hover(
  function() {
  this.style.color = '#6762a6'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //express
$(icons[7]).hover(
  function() {
  this.style.color = '#111111'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //webpack
$(icons[8]).hover(
  function() {
  this.style.color = '#1c78c0'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //mongoDB
$(icons[9]).hover(
  function() {
  this.style.color = '#519a46'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //postgreSQL
$(icons[10]).hover(
  function() {
  this.style.color = '#336791'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //git
$(icons[11]).hover(
  function() {
  this.style.color = '#f34f29'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //GitHub
$(icons[12]).hover(
  function() {
  this.style.color = '#181616'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //mocha
$(icons[13]).hover(
  function() {
  this.style.color = '#8d6748'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //python
$(icons[14]).hover(
  function() {
  this.style.color = '#ffd845'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)
  //node
$(icons[15]).hover(
  function() {
  this.style.color = '#a2d664'
  },
  function() {
  this.style.color = '#5f5f5f'
  }
)


//projects carousel

button1 = document.querySelector('.button1')
button2 = document.querySelector('.button2')
button3 = document.querySelector('.button3')
button4 = document.querySelector('.button4')

phone1 = document.querySelector('.phone1')
phone2= document.querySelector('.phone2')
phone3 = document.querySelector('.phone3')
phone4 = document.querySelector('.phone4')

project1 = document.querySelector('.project1')
project2 = document.querySelector('.project2')
project3 = document.querySelector('.project3')
project4 = document.querySelector('.project4')

let clicked = phone1
phone1.style.display = 'block'

let upLeft = 'fadeInUp'
let outRight = 'fadeOutUp'
let border = 'borderLeft'

const checkWidthDirection = function() {
  if ($(window).width() < 990) {
    outRight = 'fadeOutRight'
    upLeft = 'fadeInLeft'
    border = 'borderBottom'
    button1.style.borderLeft = 'none'
    button2.style.borderLeft = 'none'
    button3.style.borderLeft = 'none'
    button4.style.borderLeft = 'none'
    button1.style.BorderBottom = '3.5px solid #ffffffd4'
    button2.style.BorderBottom = '3.5px solid #9693b9d4'
    button3.style.BorderBottom = '3.5px solid #9693b9d4'
    button4.style.BorderBottom = '3.5px solid #9693b9d4'
  } else if ($(window).width() > 990) {
    outRight = 'fadeOutUp'
    upLeft = 'fadeInUp'
    border = 'borderLeft'
    button1.style.borderBottom = 'none'
    button2.style.borderBottom = 'none'
    button3.style.borderBottom = 'none'
    button4.style.borderBottom = 'none'
    button1.style.borderLeft = '3.5px solid #ffffffd4'
    button2.style.borderLeft = '3.5px solid #9693b9d4'
    button3.style.borderLeft = '3.5px solid #9693b9d4'
    button4.style.borderLeft = '3.5px solid #9693b9d4'
  }
}

checkWidthDirection()
$(window).resize(checkWidthDirection)

$(button1).click(function() {
  if(phone1.style.display === 'block') {return}
  project1.style.display = 'block'
  project2.style.display = 'none'
  project3.style.display = 'none'
  project4.style.display = 'none'
  button1.style[border] = '3.5px solid #ffffffd4'
  button2.style[border] = '3.5px solid #9693b9d4'
  button3.style[border] = '3.5px solid #9693b9d4'
  button4.style[border] = '3.5px solid #9693b9d4'
  $(phone1).removeClass(`${upLeft}`)
  $(clicked).addClass(`animated ${outRight} faster`)
  setTimeout(() => {
    $(phone1).addClass(`animated ${upLeft} faster`)
    $(clicked).removeClass(`${outRight}`)
    phone1.style.display = 'block'
    clicked.style.display = 'none'
    clicked = phone1
  }, 600)
})
$(button2).click(function() {
  if(phone2.style.display === 'block') {return}
  project2.style.display = 'block'
  project1.style.display = 'none'
  project3.style.display = 'none'
  project4.style.display = 'none'
  button2.style[border] = '3.5px solid #ffffffd4'
  button1.style[border] = '3.5px solid #9693b9d4'
  button3.style[border] = '3.5px solid #9693b9d4'
  button4.style[border] = '3.5px solid #9693b9d4'
  $(phone2).removeClass(`${upLeft}`)
  $(clicked).addClass(`animated ${outRight} faster`)
  setTimeout(() => {
    $(phone2).addClass(`animated ${upLeft} faster`)
    $(clicked).removeClass(`${outRight}`)
    phone2.style.display = 'block'
    clicked.style.display = 'none'
    clicked = phone2
  }, 600)
})
$(button3).click(function() {
  if(phone3.style.display === 'block') {return}
  project3.style.display = 'block'
  project2.style.display = 'none'
  project1.style.display = 'none'
  project4.style.display = 'none'
  button3.style[border] = '3.5px solid #ffffffd4'
  button2.style[border] = '3.5px solid #9693b9d4'
  button1.style[border] = '3.5px solid #9693b9d4'
  button4.style[border] = '3.5px solid #9693b9d4'
  $(phone3).removeClass(`${upLeft}`)
  $(clicked).addClass(`animated ${outRight} faster`)
  setTimeout(() => {
    $(phone3).addClass(`animated ${upLeft} faster`)
    $(clicked).removeClass(`${outRight}`)
    phone3.style.display = 'block'
    clicked.style.display = 'none'
    clicked = phone3
  }, 600)
})
$(button4).click(function() {
  if(phone4.style.display === 'block') {return}
  project4.style.display = 'block'
  project2.style.display = 'none'
  project3.style.display = 'none'
  project1.style.display = 'none'
  button4.style[border] = '3.5px solid #ffffffd4'
  button2.style[border] = '3.5px solid #9693b9d4'
  button3.style[border] = '3.5px solid #9693b9d4'
  button1.style[border] = '3.5px solid #9693b9d4'
  $(phone4).removeClass(`${upLeft}`)
  $(clicked).addClass(`animated ${outRight} faster`)
  setTimeout(() => {
    $(phone4).addClass(`animated ${upLeft} faster`)
    $(clicked).removeClass(`${outRight}`)
    phone4.style.display = 'block'
    clicked.style.display = 'none'
    clicked = phone4
  }, 600)
})




console.log("\nHey! Great to see you here. \n\nIf you want to talk more, send me an email:\n\nstephanokparaskeva@gmail.com")
}) // DOM CLOSE


