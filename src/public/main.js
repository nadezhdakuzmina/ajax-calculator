(function() {
    const button = document.querySelector('button[name="calc"]');
    const inputA = document.querySelector('input[name="valueA"]');
    const inputB = document.querySelector('input[name="valueB"]');
    const resultBox = document.querySelector('input[name="result"]');
    const selector = document.querySelector('select[name="operationType"]');
    const errorsBox = document.querySelector('#errors');

    selector.addEventListener('change', () => { 
        const operationType = selector.value;

        if (['sin', 'cos', 'tan', 'ctg'].includes(operationType)) {
            inputA.style.display = 'none';
        } else {
            inputA.style.display = 'inline';
        }
    });

    button.addEventListener('click', () => {
        errorsBox.innerText = '';

        const valueA = parseFloat(inputA.value);
        const valueB = parseFloat(inputB.value);
        const operationType = selector.value;

        if ((isNaN(valueA) && !['sin', 'cos', 'tan', 'ctg'].includes(operationType)) || isNaN(valueB)) {
            errorsBox.innerText = 'Неправильные входные значение';
            return;
        }

        fetch('/calc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },          
            body: JSON.stringify({
                valueA,
                valueB,
                operationType,
            }),
        })
            .then(res => res.json())
            .then(({ result }) => {
                resultBox.value = result;
            })
            .catch(() => {
                errorsBox.innerText = 'Ошибка на сервере! Проверьте подключение к сети';
            });
    });
})();
