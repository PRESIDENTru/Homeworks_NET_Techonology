function createPathV() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")

    let data = [];
    const padding = 100;
    const step = 5;
    
    let posX = padding;
    let posY = padding;
    
    while (posX < width / 2) {
        data.push({x: posX, y: posY});
        posX += step;
        posY += step;
    }
    
    posX = width / 2;
    posY = height - padding;
    
    while (posX < width - padding) {
        data.push({x: posX, y: posY});
        posX += step;
        posY -= step;
    }
    
    return data;
}

const drawPath =() => {
	// создаем массив точек
	const dataPoints = createPathV();

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	// создаем путь на основе массива точек	  
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('stroke', 'black')
		.attr('fill', 'none');
		
	return path;
}

function translateAlong(path, rotStart, rotEnd, sxStart, sxEnd, syStart, syEnd) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const rot = rotStart + (rotEnd - rotStart) * t;
            const sx  = sxStart + (sxEnd - sxStart) * t;
            const sy  = syStart + (syEnd - syStart) * t;
            return `translate(${x},${y}) scale(${sx},${sy}) rotate(${rot})`;
        };
    };
}
