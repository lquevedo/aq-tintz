document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!carousel || slides.length === 0) return;
    
    let currentIndex = 0;
    let startX, moveX;
    let isMoving = false;
    
    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Function to update the carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Event listeners for buttons
    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);
    
    // Touch events for mobile swipe
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isMoving = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', function(e) {
        if (!isMoving) return;
        moveX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function() {
        if (!isMoving) return;
        isMoving = false;
        
        const diffX = startX - moveX;
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left, go to next
            } else {
                prevSlide(); // Swipe right, go to previous
            }
        }
    }, { passive: true });
    
    // Auto-advance slides every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause auto-advance when hovering over carousel
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', updateCarousel);
});