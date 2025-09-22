// Simple client-side i18n for 3 languages: English, Hindi, Tamil
(function(){
  const translations = {
    en: {
      nav_about: "About",
      hero_title: "AI-Based Internship<br>Recommendation Engine<br>for PM Internship Scheme",
      hero_subtitle: "Find jobs matching your internship",
      btn_profile: "Enter your profile",
      btn_resume: "Enter your pdf resume",
      btn_chat: "Chat with AI",
      about_heading: "About",
      about_text: "This is a demo landing page offering two choices to get started.",

      // Profile page
      profile_title: "Enter your profile",
      label_full_name: "Full Name *",
      label_education: "Education *",
      label_field: "Field of Study",
      label_skills: "Skills *",
      skills_help: "Separate multiple skills with commas",
      label_interests: "Sector Interests *",
      label_location: "Preferred Location *",
      label_experience: "Experience Level",
      label_additional: "Additional Preferences",
      btn_back: "Back",
      btn_get_reco: "Get AI Recommendations",
      loading_processing: "Processing...",

      // Resume page
      resume_title: "Upload your PDF resume",
      label_pdf: "PDF file",
      label_notes: "Any other things you want",
      btn_submit: "Submit",

      // Recommendations page
      reco_title: "Your AI-Powered Internship Recommendations",
      reco_subtitle_prefix: "Based on your profile, we found",
      reco_subtitle_suffix: "perfect matches for you!",
      btn_update_profile: "Update Profile",
      btn_home: "Home",
      btn_get_new: "Get New Recommendations",
      help_title: "Need Help?",
      help_tip_1: "Updating your skills or interests",
      help_tip_2: "Changing your location preference",
      help_tip_3: "Adding more details in additional preferences",
      why_match: "Why this matches you:",
      applied_filters: "Applied Filters:",
      required_skills: "Required Skills:",
      no_reco_title: "No recommendations found",
      no_reco_desc: "Please go back and update your profile to get personalized recommendations.",
      save_later: "Save for Later",
      apply_now: "Apply Now",

      // Chat page
      chat_title: "Chat with AI",
      clear_chat: "Clear Chat",
      welcome_message: "Hello! I'm your AI assistant. I can help you with internship recommendations, career advice, or answer any questions you have. How can I assist you today?",
      chat_placeholder: "Type your message here...",
      enable_web_search: "Enable web search",
      confirm_clear_chat: "Are you sure you want to clear the chat?"
    },
    hi: {
      nav_about: "परिचय",
      hero_title: "एआई आधारित इंटर्नशिप<br>सिफारिश इंजन<br>पीएम इंटर्नशिप योजना के लिए",
      hero_subtitle: "अपनी इंटर्नशिप से मेल खाने वाली नौकरियां खोजें",
      btn_profile: "अपनी प्रोफ़ाइल भरें",
      btn_resume: "अपना पीडीएफ रिज़्यूमे दर्ज करें",
      btn_chat: "एआई से बात करें",
      about_heading: "परिचय",
      about_text: "यह शुरुआत करने के लिए दो विकल्पों के साथ एक डेमो लैंडिंग पेज है।",

      profile_title: "अपनी प्रोफ़ाइल दर्ज करें",
      label_full_name: "पूरा नाम *",
      label_education: "शिक्षा *",
      label_field: "अध्ययन का क्षेत्र",
      label_skills: "कौशल *",
      skills_help: "कई कौशलों को अल्पविराम से अलग करें",
      label_interests: "रुचि क्षेत्र *",
      label_location: "पसंदीदा स्थान *",
      label_experience: "अनुभव स्तर",
      label_additional: "अतिरिक्त प्राथमिकताएँ",
      btn_back: "वापस",
      btn_get_reco: "एआई सिफारिशें प्राप्त करें",
      loading_processing: "प्रोसेस हो रहा है...",

      resume_title: "अपना पीडीएफ रिज़्यूमे अपलोड करें",
      label_pdf: "पीडीएफ फ़ाइल",
      label_notes: "अन्य कोई जानकारी",
      btn_submit: "जमा करें",

      reco_title: "आपके लिए एआई आधारित इंटर्नशिप सिफारिशें",
      reco_subtitle_prefix: "आपकी प्रोफ़ाइल के आधार पर, हमने",
      reco_subtitle_suffix: "बेहतर मेल ढूंढे हैं!",
      btn_update_profile: "प्रोफ़ाइल अपडेट करें",
      btn_home: "होम",
      btn_get_new: "नई सिफारिशें प्राप्त करें",
      help_title: "मदद चाहिए?",
      help_tip_1: "अपने कौशल या रुचियों को अपडेट करना",
      help_tip_2: "अपनी स्थान वरीयता बदलना",
      help_tip_3: "अतिरिक्त प्राथमिकताओं में अधिक विवरण जोड़ना",
      why_match: "यह आपके लिए क्यों उपयुक्त है:",
      applied_filters: "लागू फ़िल्टर:",
      required_skills: "आवश्यक कौशल:",
      no_reco_title: "कोई सिफारिश नहीं मिली",
      no_reco_desc: "कृपया अपनी प्रोफ़ाइल अपडेट करें ताकि व्यक्तिगत सिफारिशें मिल सकें।",
      save_later: "बाद के लिए सहेजें",
      apply_now: "अभी आवेदन करें",

      // Chat page
      chat_title: "एआई से बात करें",
      clear_chat: "चैट साफ़ करें",
      welcome_message: "नमस्ते! मैं आपका एआई सहायक हूँ। मैं इंटर्नशिप सिफारिशों, करियर सलाह, या आपके किसी भी प्रश्न में मदद कर सकता हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?",
      chat_placeholder: "यहाँ अपना संदेश टाइप करें...",
      enable_web_search: "वेब खोज सक्षम करें",
      confirm_clear_chat: "क्या आप वाकई चैट साफ़ करना चाहते हैं?"
    },
    ta: {
      nav_about: "பற்றி",
      hero_title: "செயற்கை நுண்ணறிவு அடிப்படையிலான இன்டர்ன்ஷிப்<br>பரிந்துரை இயந்திரம்<br>பிரதமர் இன்டர்ன்ஷிப் திட்டத்திற்கு",
      hero_subtitle: "உங்கள் இன்டர்ன்ஷிப்பிற்கு பொருந்தும் வேலைகளை கண்டுபிடிக்கவும்",
      btn_profile: "உங்கள் சுயவிவரத்தை பதிவு செய்யவும்",
      btn_resume: "உங்கள் PDF ரெச்யூமேயை உள்ளிடவும்",
      btn_chat: "ஏஐ உடன் உரையாடவும்",
      about_heading: "பற்றி",
      about_text: "தொடங்க இரண்டு விருப்பங்களைக் கொண்ட ஒரு டெமோ லாண்டிங் பக்கம் இது.",

      profile_title: "உங்கள் சுயவிவரத்தை பதிவு செய்யவும்",
      label_full_name: "முழு பெயர் *",
      label_education: "கல்வி *",
      label_field: "பயிலும் துறை",
      label_skills: "திறன்கள் *",
      skills_help: "பல திறன்களை கமாவால் பிரிக்கவும்",
      label_interests: "விருப்பத் துறை *",
      label_location: "விரும்பிய இடம் *",
      label_experience: "அனுபவ நிலை",
      label_additional: "கூடுதல் விருப்பங்கள்",
      btn_back: "பின்செல்",
      btn_get_reco: "ஏஐ பரிந்துரைகள் பெற",
      loading_processing: "செயலாக்கப்படுகிறது...",

      resume_title: "உங்கள் PDF ரெச்யூமேயை பதிவேற்றவும்",
      label_pdf: "PDF கோப்பு",
      label_notes: "வேறு ஏதும்",
      btn_submit: "சமர்ப்பிக்கவும்",

      reco_title: "உங்களுக்கான ஏஐ இன்டர்ன்ஷிப் பரிந்துரைகள்",
      reco_subtitle_prefix: "உங்கள் சுயவிவரத்தின் அடிப்படையில், நாங்கள்",
      reco_subtitle_suffix: "சிறந்த பொருத்தங்களை கண்டுபிடித்தோம்!",
      btn_update_profile: "சுயவிவரம் புதுப்பிக்க",
      btn_home: "முகப்பு",
      btn_get_new: "புதிய பரிந்துரைகளை பெற",
      help_title: "உதவி வேண்டுமா?",
      help_tip_1: "உங்கள் திறன்கள் அல்லது விருப்பங்களைப் புதுப்பிக்கவும்",
      help_tip_2: "இட முன்னுரிமையை மாற்றவும்",
      help_tip_3: "கூடுதல் விருப்பங்களில் மேலும் விவரங்களைச் சேர்க்கவும்",
      why_match: "ஏன் இது உங்களுக்கு பொருந்துகிறது:",
      applied_filters: "பயன்படுத்தப்பட்ட வடிப்பான்கள்:",
      required_skills: "தேவையான திறன்கள்:",
      no_reco_title: "பரிந்துரைகள் எதுவும் இல்லை",
      no_reco_desc: "தயவுசெய்து உங்கள் சுயவிவரத்தை புதுப்பிக்கவும்.",
      save_later: "பின்னர் சேமிக்க",
      apply_now: "இப்போது விண்ணப்பிக்க",

      // Chat page
      chat_title: "ஏஐ உடன் உரையாடவும்",
      clear_chat: "அரட்டையை அழிக்கவும்",
      welcome_message: "வணக்கம்! நான் உங்கள் ஏஐ உதவியாளர். இன்டர்ன்ஷிப் பரிந்துரைகள், தொழில் ஆலோசனை, அல்லது உங்கள் எந்த கேள்விகளிலும் உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      chat_placeholder: "உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்...",
      enable_web_search: "வலை தேடலை இயக்கவும்",
      confirm_clear_chat: "நீங்கள் நிச்சயமாக அரட்டையை அழிக்க விரும்புகிறீர்களா?"
    }
  };

  function getLang(){
    return localStorage.getItem('lang') || 'en';
  }
  function setLang(lang){
    localStorage.setItem('lang', lang);
    // notify listeners that language changed
    try {
      document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
    } catch (e) {
      // ignore
    }
  }

  function applyTranslations(){
    const lang = getLang();
    const dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]')
      .forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = dict[key];
        if (!val) return;
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      });
  }

  function ensureLanguageSelector(){
    const existing = document.getElementById('lang-switcher');
    if (existing) {
      existing.value = getLang();
      return existing;
    }
    // Try to place inside header .site-header
    const header = document.querySelector('.site-header .nav') || document.querySelector('.site-header');
    if (!header) return null;

    const select = document.createElement('select');
    select.id = 'lang-switcher';
    select.className = 'input';
    select.style.maxWidth = '160px';
    select.style.height = '36px';
    select.innerHTML = `
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="ta">தமிழ்</option>
    `;
    select.value = getLang();
    select.addEventListener('change', () => {
      setLang(select.value);
      applyTranslations();
    });

    // Insert before first nav button if possible
    if (header.firstChild) {
      header.insertBefore(select, header.firstChild);
    } else {
      header.appendChild(select);
    }
    return select;
  }

  document.addEventListener('DOMContentLoaded', function(){
    ensureLanguageSelector();
    applyTranslations();
  });

  // Expose a small API
  window.i18n = {
    apply: applyTranslations,
    setLang,
    getLang,
    t: function(key){
      const lang = getLang();
      const dict = translations[lang] || translations.en;
      return dict[key] || key;
    }
  };
})();
