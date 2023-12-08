const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 60, value: "Yes" },
  { minDegree: 61, maxDegree: 120, value: "No" },
  { minDegree: 121, maxDegree: 180, value: "Yes" },
  { minDegree: 181, maxDegree: 240, value: "No" },
  { minDegree: 241, maxDegree: 300, value: "Yes" },
  { minDegree: 301, maxDegree: 360, value: "No" },
];

const data = [20, 20, 20, 20, 20, 20];
const pieColors = ["#8b35bc", "#b163da"];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["Yes", "No", "Yes", "No", "Yes", "No"],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: {
      duration: 100,
    },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
          size: 24,
        },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p> ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 2001;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Wait..</p>`;
  let randomDegree = Math.floor(Math.random() * 360);
  randomDegree = Math.floor(randomDegree / 60) * 60 + 30;
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = (count * resultValue) / 180;
    myChart.update();
    count++;
    resultValue--;
    if (count === 100) {
      window.clearInterval(rotationInterval);
      count = 0;
      resultValue = 2001;
      myChart.options.rotation = randomDegree / 180;
      myChart.update();
      valueGenerator(randomDegree);
    }
  }, 10);
});
