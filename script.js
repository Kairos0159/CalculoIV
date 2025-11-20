// Navegación móvil
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');

function showSlide(n) {
    // Ocultar todas las diapositivas
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remover clase active de todos los indicadores
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Ajustar índice si está fuera de rango
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Mostrar diapositiva actual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Event listeners para botones
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Event listeners para indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Cambio automático de diapositivas cada 5 segundos
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Calculadora de crecimiento bacteriano
const growthForm = document.getElementById('growth-form');
const populationResult = document.getElementById('population-result');

growthForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const p0 = parseFloat(document.getElementById('p0').value);
    const k = parseFloat(document.getElementById('k').value);
    const t = parseFloat(document.getElementById('t').value);
    
    // Calcular población usando el modelo exponencial
    const population = p0 * Math.exp(k * t);
    
    // Mostrar resultado
    populationResult.textContent = `Después de ${t} unidades de tiempo, la población será de aproximadamente ${population.toFixed(2)} bacterias.`;
});

// Gráfica de crecimiento bacteriano
const graphForm = document.getElementById('graph-form');
const ctx = document.getElementById('growth-chart').getContext('2d');
let growthChart;

// Función para generar datos para la gráfica
function generateGrowthData(p0, k, tMax) {
    const data = {
        labels: [],
        datasets: [{
            label: 'Población Bacteriana',
            data: [],
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
        }]
    };
    
    // Generar puntos para la gráfica
    for (let t = 0; t <= tMax; t += 0.5) {
        data.labels.push(t);
        data.datasets[0].data.push(p0 * Math.exp(k * t));
    }
    
    return data;
}

// Configuración de la gráfica
const chartConfig = {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Crecimiento Exponencial de Población Bacteriana',
                font: {
                    size: 16
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Población'
                },
                beginAtZero: true
            }
        }
    }
};

// Inicializar gráfica con valores por defecto
function initializeChart() {
    const p0 = parseFloat(document.getElementById('graph-p0').value);
    const k = parseFloat(document.getElementById('graph-k').value);
    const tMax = parseFloat(document.getElementById('graph-t-max').value);
    
    chartConfig.data = generateGrowthData(p0, k, tMax);
    growthChart = new Chart(ctx, chartConfig);
}

// Actualizar gráfica cuando se envíe el formulario
graphForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (growthChart) {
        growthChart.destroy();
    }
    
    initializeChart();
});

// Inicializar la gráfica al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});