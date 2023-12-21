let myChart; // Global variable to store the Chart instance

function calculateBMI() {
    const genderInput = document.getElementById('gender');
    const ageInput = document.getElementById('age');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');

    const gender = genderInput.value;
    const age = parseInt(ageInput.value);
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || isNaN(age) || height <= 0 || weight <= 0 || age <= 0) {
        resultDiv.innerHTML = '<div class="alert alert-danger" role="alert">Please enter valid height, weight, and age.</div>';
        return;
    }

    const bmi = calculateBMIScore(gender, height, weight, age);
    const bmiCategory = getBMICategory(bmi);

    resultDiv.innerHTML = `<div class="alert alert-success" role="alert">Your BMI is ${bmi.toFixed(2)} (${bmiCategory}).</div>`;

    updateChart(bmi);
}

function calculateBMIScore(gender, height, weight, age) {
    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    return weight / (heightInMeters ** 2) + (gender === 'male' ? -0.5 : 0.5) + (age >= 50 ? 1 : 0);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 24.9) return 'Normal Weight';
    if (bmi < 29.9) return 'Overweight';
    return 'Obese';
}

function updateChart(bmi) {
    if (myChart) {
        myChart.destroy(); // Destroy the previous chart instance
    }

    const ctx = document.getElementById('bmiChart').getContext('2d');

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Underweight', 'Normal Weight', 'Overweight', 'Obese'],
            datasets: [{
                data: [bmi < 18.5 ? 1 : 0, (bmi >= 18.5 && bmi < 24.9) ? 1 : 0, (bmi >= 24.9 && bmi < 29.9) ? 1 : 0, bmi >= 29.9 ? 1 : 0],
                backgroundColor: ['#ffc107', '#28a745', '#007bff', '#dc3545'],
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}
