document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');
    const switchButton = document.getElementById('switch');

    const apiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_lneSWm4KF6jScuKmbdiysHw4bw5mVZIW6m7hGGjg';

    const currencies = ['USD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'CNY'];
    
    function populateCurrencyOptions() {
        currencies.forEach(currency => {
            let option1 = document.createElement('option');
            option1.value = currency;
            option1.text = currency;
            fromCurrency.add(option1);

            let option2 = document.createElement('option');
            option2.value = currency;
            option2.text = currency;
            toCurrency.add(option2);
        });

        fromCurrency.value = 'USD';
        toCurrency.value = 'INR';
    }

    async function fetchExchangeRate(base, target) {
        const response = await fetch(`${apiUrl}&base_currency=${base}&currencies=${target}`);
        const data = await response.json();
        return data.data[target];
    }

    async function convertCurrency() {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = parseFloat(amount.value);

        if (isNaN(amountValue) || amountValue <= 0) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        const rate = await fetchExchangeRate(fromValue, toValue);
        const convertedAmount = (amountValue * rate).toFixed(2);

        resultDiv.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
    }

    function switchCurrencies() {
        const fromValue = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = fromValue;
    }

    populateCurrencyOptions();

    convertButton.addEventListener('click', convertCurrency);
    switchButton.addEventListener('click', switchCurrencies);
});
