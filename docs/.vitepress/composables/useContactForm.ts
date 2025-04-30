import { ref, computed } from 'vue';

export function useContactForm() {
  const isSubmitting = ref(false);
  const submitSuccess = ref(false);
  const submitError = ref('');
  const formTouched = ref(false);

  // Form data with validation
  const name = ref('');
  const email = ref('');
  const message = ref('');

  // Real-time validation
  const nameError = computed(() => {
    if (!name.value && !formTouched.value) return '';
    if (!name.value) return 'Name is required';
    if (name.value.length < 3) return 'Name must be at least 3 characters';
    return '';
  });

  const emailError = computed(() => {
    if (!email.value && !formTouched.value) return '';
    if (!email.value) return 'Email is required';
    
    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) return 'Please enter a valid email address';
    
    return '';
  });

  const messageError = computed(() => {
    if (!message.value && !formTouched.value) return '';
    if (!message.value) return 'Message is required';
    
    // Check if message has at least 10 words
    const wordCount = message.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 10) return 'Message must be at least 10 words';
    
    return '';
  });

  const isFormValid = computed(() => {
    return !nameError.value && !emailError.value && !messageError.value &&
           name.value && email.value && message.value;
  });

  // Touch the form to activate validation
  const touchForm = () => {
    formTouched.value = true;
  };

  const resetForm = () => {
    name.value = '';
    email.value = '';
    message.value = '';
    formTouched.value = false;
  };

  const submit = async () => {
    // Validate form before submission
    touchForm();
    
    if (!isFormValid.value) {
      return;
    }

    isSubmitting.value = true;
    submitError.value = '';
    
    try {
      // Check if we're in development environment
      const isDev = import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (isDev) {
        // In development, simulate a successful submission after a short delay
        console.log('Development mode detected. Simulating form submission:');
        console.log({
          name: name.value,
          email: email.value,
          message: message.value
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate success
        submitSuccess.value = true;
        resetForm();
      } else {
        // In production, actually submit to Netlify
        const formData = new URLSearchParams();
        formData.append('form-name', 'contact');
        formData.append('name', name.value);
        formData.append('email', email.value);
        formData.append('message', message.value);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData
        });
        
        if (response.ok) {
          submitSuccess.value = true;
          resetForm();
        } else {
          throw new Error('Form submission failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      submitError.value = error instanceof Error ? error.message : 'An unexpected error occurred';
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
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
    submit,
  };
}