function showFields(){
    const type = document.querySelector('input[name="type"]:checked').value;

    make("f1", type)
    make("f2", type)
}

function make(id, type){
    const wholeField = document.getElementById('cel1');
    const wholeField2 = document.getElementById('cel2');
    if(type==="mixed") {
        wholeField.style.display = "inline-block";
        wholeField2.style.display = "inline-block";
    } else {
        wholeField.style.display = 'none';
        wholeField.value = "";
        wholeField2.style.display = 'none';
        wholeField2.value = "";
    }
}

function checkError() {
    let elem = document.getElementById("f1");
    let inputs = elem.querySelectorAll("input");
    inputs.forEach(i => i.classList.remove("error"));
    elem = document.getElementById("f2");
    inputs = elem.querySelectorAll("input");
    inputs.forEach(i => i.classList.remove("error"));
}


document.addEventListener("DOMContentLoaded", () => {
    showFields();
    document.getElementById("show").addEventListener("click", showFields);
    document.getElementById("calc").addEventListener("click", calc);
    document.getElementById("clear").addEventListener("click", clearAll);
    document.getElementById("cel1").addEventListener("click", checkError);
    document.getElementById("num").addEventListener("click", checkError);
    document.getElementById("den").addEventListener("click", checkError);
    document.getElementById("num2").addEventListener("click", checkError);
    document.getElementById("den2").addEventListener("click", checkError);
})

function calc(){
    const f1 = getFraction(document.getElementById("f1"));
    const f2 = getFraction(document.getElementById("f2"));

    let select = document.getElementById("ops");
    let ops = [];
    for (const option of select.selectedOptions) {
        ops.push(option.value);
    }
    
    document.getElementById("ops").classList.remove("error");

    if (!ops.length) {
        document.getElementById("ops").classList.add("error");
        return;
    }

    let out="";

    ops.forEach(op=>{
        let n,d;

        if(op == "sub"){
            n = f1.n * f2.d - f2.n * f1.d;
            d = f1.d * f2.d;
            out +="Разность: ";
        }
        if(op == "mul"){
            n = f1.n * f2.n;
            d = f1.d * f2.d;
            out += "Произведение: ";
        }
        if(op == "div"){
            n = f1.n * f2.d;
            d = f1.d * f2.n;
            out += "Частное: ";
        }

        let s = simplify(n,d);
        const type = document.querySelector('input[name="type"]:checked').value;

        if (type == "mixed") {
            out += toMixed(s.n, s.d);
        } else {
            out += `${s.n}/${s.d}`;
        }
        out += "<br>";
    });

    document.getElementById("result").innerHTML = out;
}


function getFraction(elem){
    const inputs = elem.querySelectorAll("input");
    inputs.forEach(i => i.classList.remove("error"));

    let whole=0, num=0, den=1;

    if(inputs.length == 3){
        whole = +inputs[0].value;
        num = +inputs[1].value;
        den = +inputs[2].value;
    } else{
        num = +inputs[0].value;
        den = +inputs[1].value;
    }

    if (!den || isNaN(num) || isNaN(den) || isNaN(whole)){
        inputs.forEach(i=>i.classList.add("error"));
        return null;
    }

    num = whole*den + num;
    return {n:num, d:den};
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

function simplify(n,d){
    let k = gcd(n, d);
    return {n:n/k, d:d/k};
}

function toMixed(n,d){
    let w = Math.trunc(n / d);
    let r = Math.abs(n % d);
    return w ? `${w} ${r}/${d}` : `${r}/${d}`;
}


function clearAll(){
    document.querySelectorAll("input").forEach(i=>i.value="");
    document.getElementById("result").innerHTML="";
}