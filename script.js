const outputWindow = document.getElementById("op");
const card = document.getElementById("card");
const numpad = document.getElementById("numpad");
const pressureBtn = document.getElementById("pressure");
const temperatureBtn = document.getElementById("temperature");
const distanceBtn = document.getElementById("distance");

card.style.display = "none";
outputWindow.style.display = "none";
numpad.style.display = "none";
const pressure = ["atm", "Pa", "bar"];
const temperature = ["Kelvin", "Celsius", "Fahrenheit"];
const distance = ["Ångström", "Nanometer", "Meter"];

function normalizeUnit(unit) {
    const map = {
        "Celsius": "°C",
        "Fahrenheit": "°F",
        "Kelvin": "K",
        "Ångström": "Å",
        "Nanometer": "n",
        "Meter": "m",
        "atm": "atm",
        "Pa": "Pa",
        "bar": "bar"
    };
    return map[unit] || unit; // Returns the unit as it is 
}

pressureBtn.addEventListener("click", function () {
    numpad.innerHTML='';
   createCard(pressure[0], pressure[1], pressure[2]);
});

temperatureBtn.addEventListener("click", function () {
    numpad.innerHTML='';
    createCard(temperature[0], temperature[1], temperature[2]);
});

distanceBtn.addEventListener("click", function () {
    numpad.innerHTML='';
    createCard(distance[0], distance[1], distance[2]);
});

function clearOutput() {
    outputWindow.textContent = '';
}

function createOption(unit1, unit2) {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "5px";
    wrapper.className = "input-wrapper";

    const input = document.createElement('input');
    input.type = "radio";
    input.name = "conversion";
    input.value = `${unit1} to ${unit2}`;
    input.id = `${unit1}-${unit2}`;
    input.className = "input-choice";

    const label = document.createElement("label");
    label.setAttribute("for", input.id);
    label.textContent = `${unit1} → ${unit2}`;

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    card.appendChild(wrapper);

    
    input.addEventListener("change", function () {
        if (input.checked) {
            startConversion(unit1, unit2);
        }
    });
}

async function createCard(unit1, unit2, unit3) {
    card.style.display = "flex";
    card.innerHTML = ""; // Clear previous content

    // Directly create options
    createOption(unit1, unit2);
    createOption(unit1, unit3);
    createOption(unit2, unit3);
}

function startConversion(unit1, unit2) {
   //create the input thing with arrows
    createInput(unit1, unit2);
}

//has the input field
//this will have the function call for convert which gives the units to the fn to 
// so that it knows which opertaion to perform
function createInput(unit1, unit2) {
    numpad.style.display = "block";
    outputWindow.style.display = "block";
    numpad.innerHTML = `
      <input type="number" id="ip" value="0" autocomplete="off"><br>

    <input type="radio" id="toSecond" name="convert">
    <label for="toSecond">${unit1} → ${unit2}</label><br>

    <input type="radio" id="toFirst" name="convert">
    <label for="toFirst">${unit2} → ${unit1}</label><br>

    <button onclick="convert('${unit1}', '${unit2}')">Submit</button>
    `;
}



function convert(unit1, unit2) {
    const inputValue = parseFloat(document.getElementById("ip").value);//converts sting into a floating number
    const toSecond = document.getElementById("toSecond").checked;
    const toFirst = document.getElementById("toFirst").checked;

    let fromUnit, toUnit;

    if (toSecond) {
        fromUnit = unit1;
        toUnit = unit2;
    } else if (toFirst) {
        fromUnit = unit2;
        toUnit = unit1;
    }

    let result;

    //converstion logic
{
    if (fromUnit === "Celsius" && toUnit === "Fahrenheit") {
        result = (inputValue * 9 / 5) + 32;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") {
        result = (inputValue - 32) * 5 / 9;
    } else if (fromUnit === "Celsius" && toUnit === "Kelvin") {
        result = inputValue + 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Celsius") {
        result = inputValue - 273.15;
    } else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") {
        result = (inputValue - 32) * 5 / 9 + 273.15;
    } else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") {
        result = (inputValue - 273.15) * 9 / 5 + 32;
    } else if (fromUnit === "Ångström" && toUnit === "Nanometer") {
        result = inputValue * 0.1;
    } else if (fromUnit === "Nanometer" && toUnit === "Ångström") {
        result = inputValue * 10;
    } else if (fromUnit === "Nanometer" && toUnit === "Meter") {
        result = inputValue * 1e-9;
    } else if (fromUnit === "Meter" && toUnit === "Nanometer") {
        result = inputValue * 1e9;
    } else if (fromUnit === "Ångström" && toUnit === "Meter") {
        result = inputValue * 1e-10;
    } else if (fromUnit === "Meter" && toUnit === "Ångström") {
        result = inputValue * 1e10;
    } else if (fromUnit === "atm" && toUnit === "Pa") {
        result = inputValue * 101325;
    } else if (fromUnit === "Pa" && toUnit === "atm") {
        result = inputValue / 101325;
    } else if (fromUnit === "atm" && toUnit === "bar") {
        result = inputValue * 1.01325;
    } else if (fromUnit === "bar" && toUnit === "atm") {
        result = inputValue / 1.01325;
    } else if (fromUnit === "bar" && toUnit === "Pa") {
        result = inputValue * 100000;
    } else if (fromUnit === "Pa" && toUnit === "bar") {
        result = inputValue / 100000;
    } else {
        result = "Unsupported conversion.";
    }}

    //gives the symbol of the unit
    fromUnit = normalizeUnit(fromUnit);
    toUnit = normalizeUnit(toUnit);

    outputWindow.textContent = `${inputValue} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}
