        let BaseURL = "https://latest.currency-api.pages.dev/v1/currencies";

        const DropDowns = document.querySelectorAll(".dropdown select");
        const btn = document.querySelector("form button");
        const fromCurr = document.querySelector(".from select");
        const toCurr = document.querySelector(".To select");

//Add Options in Dropdown
for (let select of DropDowns) {
    for (let Currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value = Currcode;
        if (select.name === "From" && Currcode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && Currcode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })  
}

// Update Flag with Currency 
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1){
        amount.value = "1";
        amountValue = 1;
    }
    //console.log(fromCurr.value, toCurr.value);
    let URL = `${BaseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);

    let totalExRate = (amountValue * rate).toFixed(2);
    let exchangeRate = document.querySelector(".display");
    exchangeRate.innerText = `${amountValue} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
})