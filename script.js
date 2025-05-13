document.addEventListener('DOMContentLoaded', function() {
    // 1. Event Handling
    
    // Button click
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked!";
        clickOutput.style.color = "#2ecc71";
    });
    
    // Hover effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "Hover detected!";
        hoverOutput.style.color = "#e67e22";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Waiting for hover...";
        hoverOutput.style.color = "#333";
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keypress', function(e) {
        keypressOutput.textContent = `Key pressed: ${e.key}`;
        keypressOutput.style.color = "#9b59b6";
    });
    
    // Secret action (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = "You found the double-click secret! 🎉";
        secretBox.classList.add('active');
        setTimeout(() => secretBox.classList.remove('active'), 2000);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretOutput.textContent = "You found the long-press secret! 🎉";
            secretBox.classList.add('active');
            setTimeout(() => secretBox.classList.remove('active'), 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // 2. Interactive Elements
    
    // Color changing button
    const colorBtn = document.getElementById('color-btn');
    const colorBox = document.getElementById('color-box');
    const colors = ['#4a6fa5', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorBox.style.backgroundColor = colors[colorIndex];
        colorBox.style.transform = 'rotate(' + (colorIndex * 72) + 'deg)';
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImage = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImage);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImage = (currentImage + 1) % galleryImages.length;
        showImage(currentImage);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(function() {
        currentImage = (currentImage + 1) % galleryImages.length;
        showImage(currentImage);
    }, 3000);
    
    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 3. Form Validation
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
        } else {
            nameError.style.display = 'none';
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() !== '' && !emailRegex.test(this.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
        } else {
            emailError.style.display = 'none';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const lengthRule = document.getElementById('length-rule');
        const numberRule = document.getElementById('number-rule');
        const specialRule = document.getElementById('special-rule');
        
        // Check password rules
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        // Update rules display
        lengthRule.classList.toggle('valid', hasMinLength);
        numberRule.classList.toggle('valid', hasNumber);
        specialRule.classList.toggle('valid', hasSpecial);
        
        // Show error if password exists but doesn't meet all rules
        if (password.trim() !== '' && (!hasMinLength || !hasNumber || !hasSpecial)) {
            passwordError.textContent = 'Password does not meet all requirements';
            passwordError.style.display = 'block';
        } else {
            passwordError.style.display = 'none';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            isValid = false;
        }
        
        // Validate email if provided
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate password if provided
        const password = passwordInput.value;
        if (password.trim() !== '') {
            const hasMinLength = password.length >= 8;
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            
            if (!hasMinLength || !hasNumber || !hasSpecial) {
                passwordError.textContent = 'Password does not meet all requirements';
                passwordError.style.display = 'block';
                isValid = false;
            }
        }
        
        if (!isValid) {
            e.preventDefault();
        } else {
            alert('Form submitted successfully!');
        }
    });
});