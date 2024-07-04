/* eslint-env browser */

// Initialize or retrieve values from Local Storage
const values = JSON.parse(localStorage.getItem('curryCounterValues')) || {
    sussy: 0,
    fish: 0,
    veggie: 0,
    creamy: 0,
    sirloin: 0,
};

const updateLocalStorage = () => {
    localStorage.setItem('curryCounterValues', JSON.stringify(values));
};

const updateValues = () => {
    const totalValue = Object.values(values).reduce((acc, curr) => acc + curr, 0);
    Object.keys(values).forEach((key) => {
        const valueElement = document.getElementById(`${key}-value`);
        const percentElement = document.getElementById(`${key}-percent`);
        valueElement.textContent = values[key];
        percentElement.textContent = totalValue ? `${((values[key] / totalValue) * 100).toFixed(2)}%` : '0%';
    });
    document.getElementById('total-value').textContent = totalValue;
    updateLocalStorage();
};

document.querySelectorAll('.icon-container').forEach((container) => {
    const type = container.dataset.type;
    container.querySelector('img').addEventListener('click', () => {
        values[type]++;
        updateValues();
    });
    container.querySelector('.plus-button').addEventListener('click', () => {
        values[type]++;
        updateValues();
    });
    container.querySelector('.minus-button').addEventListener('click', () => {
        values[type] = Math.max(0, values[type] - 1);
        updateValues();
    });
});

function confirmReset() {
    if (confirm('Are you sure you want to reset all values?')) {
        // Reset values to 0
        Object.keys(values).forEach((key) => {
            values[key] = 0;
        });
        // Update the UI
        updateValues();
    }
}


updateValues();
