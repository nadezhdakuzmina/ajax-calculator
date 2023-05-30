const express = require('express');

const server = express();

// Мидлвейр для обработки post запросов
server.use(express.json());

server.post('/calc', (req, res) => {
    const {
        valueA,
        valueB,
        operationType,
    } = req.body;

    let result;
    switch(operationType) {
        case '+':
            result = valueA + valueB;
            break;

        case '-':
            result = valueA - valueB;
            break;

        case '/':
            result = valueA / valueB;
            break;

        case '*':
            result = valueA * valueB;
            break;

        case '^':
            result = valueA ** valueB;
            break;

        case '√':
            result = valueB ** (1/valueA);
            break;

        case 'sin':
            result = Math.sin(valueB);
            break;

        case 'cos':
            result = Math.cos(valueB);
            break;

        case 'tan':
            result = Math.tan(valueB);
            break;

        case 'ctg':
            result = 1 / Math.tan(valueB);
            break;

        default:
            return res.status(400).json({
                message: 'Invalid operationType',
            });
    }

    res.json({
        result,
    });
});

server.use('/', express.static(__dirname + '/public'));

server.listen(8080, () => {
    console.log('Server listening on port: 8080');
});
