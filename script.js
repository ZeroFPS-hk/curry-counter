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

function updateValues() {
    // Update individual values and percentages
    Object.keys(values).forEach((key) => {
        const elementValue = document.getElementById(key + "-value");
        const elementPercent = document.getElementById(key + "-percent");

        elementValue.textContent = values[key];
        const total = Object.values(values).reduce((a, b) => a + b, 0);
        const percent = total === 0 ? 0 : ((values[key] / total) * 100).toFixed(1);
        elementPercent.textContent = percent + "%";
    });

    // Calculate and update total count, total ligma, and total credits
    const totalCount = Object.values(values).reduce((a, b) => a + b, 0);
    const totalLigma = (values.sussy * 0) + (values.fish * 1) + (values.veggie * 1.5) + (values.creamy * 2.5) + (values.sirloin * 4);
    const totalCredits = (values.sussy * 0.6) + (values.fish * 0.4) + (values.veggie * 0.4) + (values.creamy * 0.2) + (values.sirloin * 0.2);

    document.getElementById("total-count").textContent = totalCount;
    document.getElementById("total-ligma").textContent = totalLigma;
    document.getElementById("total-credits").textContent = totalCredits.toFixed(1) + " million";
    updateLocalStorage();
}

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
