import { supabase } from './supabase-client.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginFormElement = document.getElementById('loginFormElement');
const signupFormElement = document.getElementById('signupFormElement');
const messageContainer = document.getElementById('messageContainer');
const message = document.getElementById('message');

// Form switching functions
window.showSignup = function() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    clearMessages();
    // Show admin link on signup page
    document.getElementById('adminLink').style.display = 'block';
}

window.showLogin = function() {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    clearMessages();
    // Hide admin link on login page
    document.getElementById('adminLink').style.display = 'none';
}

// Password visibility toggle
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Message display functions
function showMessage(text, type = 'info') {
    message.textContent = text;
    message.className = `message ${type} show`;
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 5000);
}

function clearMessages() {
    message.classList.remove('show');
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    
    if (strength < 2) return 'weak';
    if (strength < 3) return 'medium';
    if (strength < 4) return 'strong';
    return 'very-strong';
}

// Add password strength indicator
function addPasswordStrengthIndicator() {
    const signupPassword = document.getElementById('signupPassword');
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = '<div class="password-strength-bar"></div>';
    
    signupPassword.parentNode.appendChild(strengthIndicator);
    
    signupPassword.addEventListener('input', function() {
        const strength = getPasswordStrength(this.value);
        strengthIndicator.className = `password-strength ${strength}`;
    });
}

// Track login activity
function trackLoginActivity(email, name) {
    try {
        // Get existing login activity
        const loginActivity = JSON.parse(localStorage.getItem('loginActivity') || '[]');
        
        // Add new login record
        const newLogin = {
            email: email,
            name: name,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            sessionId: Date.now().toString()
        };
        
        // Add to beginning of array (most recent first)
        loginActivity.unshift(newLogin);
        
        // Keep only last 100 login records to prevent localStorage from getting too large
        if (loginActivity.length > 100) {
            loginActivity.splice(100);
        }
        
        // Save back to localStorage
        localStorage.setItem('loginActivity', JSON.stringify(loginActivity));
        
        console.log('Login activity tracked:', newLogin);
    } catch (error) {
        console.error('Error tracking login activity:', error);
    }
}

// API authentication functions
async function loginUser(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            showMessage(error.message || 'Login failed. Please try again.', 'error');
            throw error;
        }

        if (data && data.user) {
            // Store user data
            const user = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name || email.split('@')[0]
            };

            localStorage.setItem('authToken', data.session.access_token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Track login activity
            trackLoginActivity(user.email, user.name);

            showMessage('Login successful! Redirecting to StudyCast...', 'success');
            setTimeout(() => {
                window.location.href = 'https://studycast-1.onrender.com/';
            }, 2000);

            return { success: true, token: data.session.access_token };
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Network error. Please check your connection.', 'error');
        throw error;
    }
}

async function signupUser(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            showMessage(error.message || 'Signup failed. Please try again.', 'error');
            throw error;
        }

        if (data && data.user) {
            showMessage('Account created successfully! Please sign in.', 'success');
            setTimeout(() => {
                showLogin();
            }, 2000);
            return { success: true, user: data.user };
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Network error. Please check your connection.', 'error');
        throw error;
    }
}

// Form submission handlers
loginFormElement.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Validation
    if (!email || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        await loginUser(email, password);
    } catch (error) {
        // Error is already handled in loginUser function
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

signupFormElement.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showMessage('Password must be at least 8 characters with uppercase, lowercase, and number.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('Please agree to the terms and conditions.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        await signupUser(name, email, password);
    } catch (error) {
        // Error is already handled in signupUser function
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Input validation on blur
document.getElementById('loginEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#f44336';
    } else {
        this.style.borderColor = '#e1e1e1';
    }
});

document.getElementById('signupEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = '#f44336';
    } else {
        this.style.borderColor = '#e1e1e1';
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('signupPassword').value;
    if (this.value && this.value !== password) {
        this.style.borderColor = '#f44336';
    } else {
        this.style.borderColor = '#e1e1e1';
    }
});

// Initialize password strength indicator
document.addEventListener('DOMContentLoaded', function() {
    addPasswordStrengthIndicator();
    
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
        // Verify token and redirect if valid
        // This would typically involve an API call to verify the token
        console.log('User already logged in');
    }
});

// Auto-hide messages when clicking outside
document.addEventListener('click', function(e) {
    if (!messageContainer.contains(e.target)) {
        clearMessages();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to clear messages
    if (e.key === 'Escape') {
        clearMessages();
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('input-group')) {
            activeElement.style.outline = '2px solid #ff6b35';
        }
    }
});

// Form field focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.style.transform = 'scale(1)';
    });
});

// Prevent form submission on Enter key in non-submit inputs
document.querySelectorAll('input:not([type="submit"])').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = this.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
});
