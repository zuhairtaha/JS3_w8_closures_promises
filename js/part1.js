"use strict";

let arr = [];
for (let i = 1; i <= 1000; i++) {
    arr.push(i);
}
//console.log(arr);
// here please start your solution
// using closures, functions and (map,filter,reduce)

const divisibleFactory = z => {
    let _arr = arr.filter(n => n % z === 0); // array of numbers divisible by z
    return {
        getNumbers: () => _arr,
        amount: () => _arr.length,
    }
};

// apply your function
// const divisibleByWHATEVERNUMBER = arr ... WHATEVER NUMBER ... ;


document.querySelector("#divisibleForm").addEventListener('submit', event => {
    event.preventDefault();

    // get (z) value:
    // 1. get radio buttons and input values
    let divisibleByRadioValue = new FormData(event.target).get('divisibleByRadio');
    let divisibleByInputValue = new FormData(event.target).get('divisibleByInput');

    // 2. then get the sited one (by comparing and getting the max)
    let divisibleByValue = Math.max(divisibleByInputValue, divisibleByRadioValue);
    if (divisibleByValue === 0) {
        alert('please inter a number! 😕');
    } else {
        // set z value and results in HTML page
        document.querySelector('#numberSelected').innerHTML = divisibleByValue.toString();
        let divisibleByNumberSelected = divisibleFactory(divisibleByValue);
        document.querySelector('#amount').innerHTML = divisibleByNumberSelected.amount();
        document.querySelector('#allDivisors').innerHTML = divisibleByNumberSelected.getNumbers().join(', ');
    }
});

const divisibleByInput = document.querySelector('input[name=divisibleByInput]');
const divisibleByRadio = document.querySelectorAll('input[name=divisibleByRadio]');

// when check any radio button reset input filed
divisibleByRadio.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        divisibleByInput.value = '';
    })
});

// when the input field (optional value) change, then uncheck radio buttons
divisibleByInput.addEventListener('change', () => {
    divisibleByRadio.forEach(radioButton => {
        radioButton.checked = false;
    });
});

// the number of item in arr above which are divisible by numbers between 1-30
const divisibleBy1_30 = [];
for (let i = 1; i <= 30; i++) {
    divisibleBy1_30.push(divisibleFactory(i).amount());
}
document.querySelector('#countItemsDivisible1_30').innerHTML = divisibleBy1_30.join(', ');