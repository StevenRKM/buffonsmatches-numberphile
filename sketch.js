const WIDTH = 1500
const HEIGHT = 600
const MATCH_LENGTH = 25;

const INNER_LEFT = MATCH_LENGTH;
const INNER_RIGHT = WIDTH - 2*MATCH_LENGTH;
const INNER_TOP = MATCH_LENGTH + MATCH_LENGTH/2;
const INNER_BOTTOM = HEIGHT - 2.5*MATCH_LENGTH;


let grid = []

let count_collided = 0;
let total_matches = 0;

let speed = 100;

function setup() {

    angleMode(DEGREES);
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('canvasContainer');

    // generate grid lines
    let distance = 2*MATCH_LENGTH;
    let start = INNER_LEFT/2;
    let current_gridline = start;

    while(current_gridline < WIDTH) {
        grid.push(current_gridline);

        stroke('gray');
        strokeWeight(3);
        line(current_gridline, 0, current_gridline, HEIGHT);

        current_gridline += distance;
    }

    // generate first batch
    // generateMatches();
  }
  

function updateUI() {
    let pi = total_matches / count_collided;

    document.getElementById('pi').innerHTML = pi;
    document.getElementById('total_matches').innerHTML = total_matches;
    document.getElementById('colored_matches').innerHTML = count_collided;
}

function generateMatches(matches = 10000) {
    for (var i=0; i<matches; i++) {
        let match = createRotatedLine(
            floor(random(INNER_LEFT, INNER_RIGHT+MATCH_LENGTH)),
            floor(random(INNER_TOP, INNER_BOTTOM+MATCH_LENGTH)),
            MATCH_LENGTH,
            random(360)
            );
        
        // check for collision with any of the grid lines
        let collided = false;
        for(x of grid) {
            
            if( (match[0] <= x && x <= match[2]) // x1 < x2
                || (match[2] <= x && x <= match[0]) ) { // x2 < x1
                collided = true;
                break;
            } 

        }

        if(collided) {
            stroke('orange');
            stroke('hsl('+floor(map(min(match[0], match[2]), INNER_LEFT, INNER_RIGHT+MATCH_LENGTH, 10, 360))+', 50%, 50%)');
            strokeWeight(2);
            count_collided++;
        } else {
            stroke('gray');
            strokeWeight(1);
        }

        line(match[0], match[1], match[2], match[3]);
    }

    total_matches += matches;

    updateUI();
}

function speedChanged(val) {
    speed = parseInt(val);
    document.getElementById('speed').innerHTML = val;
}

setInterval(function() {generateMatches(speed);}, speed);

function createRotatedLine(x,y,length,degrees) {
    return [x, y, floor(x+length*cos(degrees)), floor(y+length*sin(degrees))];
}