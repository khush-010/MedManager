// Smooth Scroll for links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Hover effect for Step Boxes
const stepBoxes = document.querySelectorAll('.step-box');

stepBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.backgroundColor = '#f0f8ff'; /* Light blue hover effect */
    });

    box.addEventListener('mouseleave', () => {
        box.style.backgroundColor = '#ffffff';
    });
});
