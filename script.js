document.addEventListener('DOMContentLoaded', () => {
    const backgroundText = document.querySelector('.bg-text');
    const sections = document.querySelectorAll('section');
    const backgroundRef = document.querySelector('.background-text');
    

    // Setup canvas
    const canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        // Set canvas size
        function resizeCanvas() {
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Drawing functions
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function draw(e) {
            if (!isDrawing) return;
            
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = '#E17B3D';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function stopDrawing() {
            isDrawing = false;
        }
    }

    // Intersection Observer for sections with fixed positioning
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newText = entry.target.dataset.background || 'PORTFOLIO';
                if (backgroundText.textContent !== newText) {
                    backgroundText.classList.remove('visible');
                    
                    setTimeout(() => {
                        backgroundText.textContent = newText;
                        backgroundText.classList.add('visible');
                    }, 350);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Make code container editable
    const codeContainer = document.querySelector('.code-container pre code');
    if (codeContainer) {
        codeContainer.setAttribute('contenteditable', 'true');
        codeContainer.setAttribute('spellcheck', 'false');
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submission is not implemented in this demo. Add your form handling logic here.');
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

    


