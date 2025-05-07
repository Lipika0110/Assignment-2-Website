// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form Validation for Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm(contactForm)) {
                showFormSuccess(contactForm, 'Thank you for your message! We will get back to you soon.');
            }
        });
    }
    
    // Form Validation for Booking Form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm(bookingForm)) {
                showFormSuccess(bookingForm, 'Your booking has been submitted! We will confirm your order shortly.');
            }
        });
    }
    
    // Mini Contact Form in Gallery Page
    const miniContactForm = document.getElementById('miniContactForm');
    if (miniContactForm) {
        miniContactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm(miniContactForm)) {
                showFormSuccess(miniContactForm, 'Thank you for your inquiry! We will respond soon.');
            }
        });
    }
    
    // Toggle Inquiry Form
    const inquiryBtn = document.getElementById('inquiryBtn');
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryBtn && inquiryForm) {
        inquiryBtn.addEventListener('click', function() {
            inquiryForm.classList.toggle('hidden');
            
            // Change button text based on form visibility
            if (inquiryForm.classList.contains('hidden')) {
                inquiryBtn.textContent = 'Make an Inquiry';
            } else {
                inquiryBtn.textContent = 'Hide Form';
                // Focus on the first input field
                document.getElementById('inquiryName').focus();
            }
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation links based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if ((currentPage === '' || currentPage === 'index.html') && (linkPage === 'index.html' || linkPage === '')) {
            link.classList.add('active');
        } else if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
});

// Form Validation Function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Reset previous error styles
        input.style.borderColor = '';
        
        // Check if required field is empty
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        // Validate email format
        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            }
        }
        
        // Add input event listener to clear error on typing
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
    
    return isValid;
}

// Show success message after form submission
function showFormSuccess(form, message) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.backgroundColor = '#c1f0c1';
    successMessage.style.color = '#2e7d32';
    successMessage.style.padding = '1rem';
    successMessage.style.borderRadius = '8px';
    successMessage.style.marginTop = '1rem';
    successMessage.style.textAlign = 'center';
    successMessage.textContent = message;
    
    // Insert message after the form
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Reset form
    form.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        
        // Remove element after fade out
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}

// Gallery image hover effect enhancement
const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}