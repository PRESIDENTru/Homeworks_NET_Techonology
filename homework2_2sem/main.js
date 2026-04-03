document.addEventListener("DOMContentLoaded", () => {

    const width = 1200;
    const height = 700;
    let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);


    document.getElementById("drow").addEventListener("click", () => {
        draw(document.getElementById("setting"))
    });
    document.getElementById("clear").addEventListener("click", () => {
        svg.selectAll('*').remove()
    });
    document.getElementById("anim").addEventListener("click", () => {
        runAnimation(document.getElementById("setting"))
    })
})

const draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawRocket(svg)
    pict.attr("transform", `translate(${dataForm.cx.value},
                                      ${dataForm.cy.value})
                                       scale(${dataForm.scalex.value},
                                       ${dataForm.scaley.value})
                                        rotate(${dataForm.rotate.value})`);
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg");
    svg.selectAll('*').remove();
 
    let path = drawPath();
    let pict = drawRocket(svg);
 
    const duration = +dataForm.speed.value;
    const rotStart = +dataForm.rotate.value;
    const rotEnd   = +dataForm.rotate_finish.value;
    const sxStart  = +dataForm.scalex.value;
    const sxEnd    = +dataForm.scalex_finish.value;
    const syStart  = +dataForm.scaley.value;
    const syEnd    = +dataForm.scaley_finish.value;
 
    pict.transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween('transform', translateAlong(
            path.node(),
            rotStart, rotEnd,
            sxStart, sxEnd,
            syStart, syEnd
        ));
}