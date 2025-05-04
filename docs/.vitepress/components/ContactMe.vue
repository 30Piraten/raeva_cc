<script setup lang="ts">
import { useContactForm } from '../composables/useContactForm';
import { ref, onMounted } from 'vue';

const {
  name,
  email,
  message,
  nameError,
  emailError,
  messageError,
  isFormValid,
  isSubmitting,
  submitSuccess,
  submitError,
  touchForm,
  resetForm,
  submit
} = useContactForm();

// Animation control
const isVisible = ref(false);

onMounted(() => {
  // Add a slight delay for animation
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div class="contact-container" :class="{ 'is-visible': isVisible }">
    <div class="contact-card">
      <!-- Success message -->
      <div v-if="submitSuccess" class="success-message">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3>Message Sent!</h3>
        <p class="form-intro">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <button @click="submitSuccess = false" class="button button-secondary">
          Send another message
        </button>
      </div>
      
      <!-- Contact Form -->
      <form v-else 
            @submit.prevent="submit" 
            class="contact-form" 
            data-netlify="true" 
            method="POST"
            name="contact" 
            netlify-honeypot="bot-field">
        
        <h2>Get in Touch</h2>
        <p class="form-intro">Have questions or just want to say hello? Send me a message and I'll respond as soon as possible.</p>
        
        <!-- Hidden input for Netlify Forms -->
        <input type="hidden" name="form-name" value="contact" />
        <p class="hidden">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>
        
        <!-- Error message -->
        <div v-if="submitError" class="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {{ submitError }}
        </div>
        
        <!-- Name field -->
        <div class="form-field" :class="{ 'has-error': nameError }">
          <label for="name">Name</label>
          <div class="input-container">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              type="text" 
              id="name" 
              name="name" 
              v-model="name" 
              @blur="touchForm"
              placeholder="Your name" 
              autocomplete="name" />
          </div>
          <span v-if="nameError" class="error-text">{{ nameError }}</span>
        </div>

        <!-- Email field -->
        <div class="form-field" :class="{ 'has-error': emailError }">
          <label for="email">Email</label>
          <div class="input-container">
            <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input 
              type="email" 
              id="email" 
              name="email" 
              v-model="email" 
              @blur="touchForm"
              placeholder="Your email address" 
              autocomplete="email" />
          </div>
          <span v-if="emailError" class="error-text">{{ emailError }}</span>
        </div>

        <!-- Message field -->
        <div class="form-field" :class="{ 'has-error': messageError }">
          <label for="message">Message</label>
          <div class="textarea-container">
            <textarea 
              id="message" 
              name="message" 
              v-model="message" 
              @blur="touchForm"
              placeholder="Your message (minimum 10 words)" 
              rows="5"></textarea>
          </div>
          <span v-if="messageError" class="error-text">{{ messageError }}</span>
        </div>

        <!-- Submit button -->
        <div class="form-actions">
          <button 
            type="submit" 
            class="button button-primary" 
            :disabled="isSubmitting || !isFormValid">
            <span v-if="isSubmitting">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
              Sending...
            </span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.contact-container.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  position: relative;
}

/* Form header */
.contact-form h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.form-intro {
  color: black;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Form layout */
.contact-form, .success-message {
  padding: 2.5rem;
}

.form-field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.input-container, .textarea-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #a0aec0;
}

input, textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #2d3748;
  background-color: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

input {
  padding-left: 3rem;
  height: 3rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  background-color: #fff;
}

.has-error input, .has-error textarea {
  border-color: #f56565;
  background-color: #fff;
}

.has-error input:focus, .has-error textarea:focus {
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.15);
}

.error-text {
  display: block;
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.form-actions {
  margin-top: 2rem;
}

/* Buttons */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.button-primary {
  background-color: #4299e1;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background-color: #3182ce;
}

.button-primary:active:not(:disabled) {
  background-color: #2b6cb0;
}

.button-primary:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.button-secondary {
  background-color: #edf2f7;
  color: #4a5568;
}

.button-secondary:hover {
  background-color: #e2e8f0;
}

.button-secondary:active {
  background-color: #cbd5e0;
}

/* Success message */
.success-message {
  text-align: center;
  padding: 3rem 2rem;
}

.success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color: #c6f6d5;
  color: #38a169;
  border-radius: 50%;
  margin-bottom: 1.5rem;
}

.success-icon svg {
  width: 2rem;
  height: 2rem;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.success-message p {
  color: #718096;
  margin-bottom: 2rem;
}

/* Error message */
.error-message {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 0.5rem;
  color: #b91c1c;
  margin-bottom: 1.5rem;
}

.error-message svg {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

/* Loading spinner */
.spinner {
  animation: rotate 2s linear infinite;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.path {
  stroke: #fff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* Hidden honeypot field for spam protection */
.hidden {
  display: none !important;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .contact-form, .success-message {
    padding: 1.5rem;
  }
  
  .form-field {
    margin-bottom: 1.25rem;
  }
}
</style>