document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('btn-profile');
    const resumeBtn = document.getElementById('btn-resume');

    profileBtn?.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    resumeBtn?.addEventListener('click', () => {
        window.location.href = 'resume.html';
    });

    // Language dropdown functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageMenu = document.getElementById('language-menu');
    const currentLang = document.getElementById('current-lang');
    const languageOptions = document.querySelectorAll('.language-option');

    // Toggle dropdown
    languageToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        languageMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageMenu.classList.remove('active');
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = option.dataset.lang;
            const selectedText = option.textContent;
            
            // Update current language display
            currentLang.textContent = selectedText;
            
            // Update all elements with language data
            updateLanguage(selectedLang);
            
            // Store selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Close dropdown
            languageMenu.classList.remove('active');
        });
    });

    // Load saved language on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    updateLanguage(savedLang);
    
    // Update current language display
    const savedLangText = languageOptions.find(opt => opt.dataset.lang === savedLang)?.textContent || 'English';
    currentLang.textContent = savedLangText;
});

function updateLanguage(lang) {
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en], [data-hi], [data-ta]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'H1' || element.tagName === 'H2') {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    });
}


