function drawRocket(svg) {
    let rocket = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("stroke-linejoin", "round");
    
    // корпус ракеты (треугольник с закругленными углами или просто треугольник)
    rocket.append("polygon")
        .attr("points", "0,-50 -25,30 0,10 25,30")
        .style("fill", "lightgray");
    
    // нос ракеты 
    rocket.append("polygon")
        .attr("points", "0,-50 -15,0 15,0")
        .style("fill", "red")
        .style("stroke", "red");
    
    // иллюминатор
    rocket.append("circle")
        .attr("cx", 0)
        .attr("cy", -10)
        .attr("r", 12)
        .style("fill", "lightblue")
        .style("stroke", "darkblue");

    // левое крыло
    rocket.append("polygon")
        .attr("points", "-25,30 -45,55 -25,40")
        .style("fill", "orange");
    
    // правое крыло
    rocket.append("polygon")
        .attr("points", "25,30 45,55 25,40")
        .style("fill", "orange");
    
    
    let flame = rocket.append("g");
    flame.append("polygon")
        .attr("points", "-6,40 0,65 6,40")
        .style("fill", "orange")
        .style("stroke", "orange");
    
    flame.append("polygon")
        .attr("points", "-3,40 0,55 3,40")
        .style("fill", "yellow")
        .style("stroke", "yellow");
    
    
    return rocket;
}