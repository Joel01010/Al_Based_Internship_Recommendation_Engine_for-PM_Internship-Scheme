/**
 * AI Chat Interface
 * Integrates with the AI models from the main src/ directory
 */

class ChatInterface {
    constructor() {
        this.messages = [];
        this.isStreaming = false;
        this.selectedModel = 'ollama';
        this.abortController = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadChatHistory();
        this.setupAutoResize();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatForm = document.getElementById('chat-form');
        this.sendButton = document.getElementById('send-button');
        this.modelSelect = document.getElementById('model-select');
        this.clearButton = document.getElementById('clear-chat');
        this.charCount = document.getElementById('char-count');
        this.webSearchCheckbox = document.getElementById('web-search');
        this.sendIcon = this.sendButton.querySelector('.send-icon');
        this.loadingIcon = this.sendButton.querySelector('.loading-icon');
    }

    bindEvents() {
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.chatInput.addEventListener('input', () => this.handleInputChange());
        this.chatInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.modelSelect.addEventListener('change', (e) => this.handleModelChange(e));
        this.clearButton.addEventListener('click', () => this.clearChat());
        
        // Re-apply translations when language changes
        document.addEventListener('i18n:changed', () => {
            this.updatePlaceholder();
        });
    }

    setupAutoResize() {
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
        });
    }

    handleInputChange() {
        const length = this.chatInput.value.length;
        this.charCount.textContent = length;
        this.sendButton.disabled = length === 0 || this.isStreaming;
        
        // Update character count color
        if (length > 3800) {
            this.charCount.style.color = '#ef4444';
        } else if (length > 3500) {
            this.charCount.style.color = '#f59e0b';
        } else {
            this.charCount.style.color = '#6b7280';
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!this.sendButton.disabled) {
                this.handleSubmit(e);
            }
        }
    }

    handleModelChange(e) {
        this.selectedModel = e.target.value;
        localStorage.setItem('selectedChatModel', this.selectedModel);
    }

    updatePlaceholder() {
        if (window.i18n) {
            this.chatInput.placeholder = window.i18n.t('chat_placeholder');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const message = this.chatInput.value.trim();
        if (!message || this.isStreaming) return;

        // Add user message
        this.addMessage('user', message);
        this.chatInput.value = '';
        this.handleInputChange();
        
        // Show loading state
        this.setStreamingState(true);
        
        try {
            await this.sendMessage(message);
        } catch (error) {
            console.error('Chat error:', error);
            this.addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        } finally {
            this.setStreamingState(false);
        }
    }

    async sendMessage(message) {
        const options = {
            model: this.selectedModel,
            webSearch: this.webSearchCheckbox.checked,
            stream: true
        };

        // Create abort controller for this request
        this.abortController = new AbortController();

        try {
            // Try to use the integrated AI service first
            if (window.aiService && window.aiService.isInitialized) {
                await this.sendToAIService(message, options);
            } else {
                // Fallback to mock/local processing
                await this.sendToMockAI(message, options);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                this.addMessage('assistant', 'Message cancelled.');
            } else {
                throw error;
            }
        }
    }

    async sendToAIService(message, options) {
        // This would integrate with the actual AI models from src/
        // For now, we'll simulate the streaming response
        const response = await this.simulateAIResponse(message, options);
        
        let assistantMessageElement = null;
        let fullResponse = '';

        // Simulate streaming
        for (let i = 0; i < response.length; i += 3) {
            if (this.abortController.signal.aborted) {
                throw new Error('AbortError');
            }

            const chunk = response.slice(i, i + 3);
            fullResponse += chunk;

            if (!assistantMessageElement) {
                assistantMessageElement = this.addMessage('assistant', chunk, true);
            } else {
                this.updateStreamingMessage(assistantMessageElement, fullResponse);
            }

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Finalize the message
        if (assistantMessageElement) {
            this.finalizeStreamingMessage(assistantMessageElement);
        }
    }

    async sendToMockAI(message, options) {
        const response = await this.simulateAIResponse(message, options);
        
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.addMessage('assistant', response);
    }

    async simulateAIResponse(message, options) {
        // Enhanced mock responses based on message content
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('internship') || lowerMessage.includes('job')) {
            return `Based on your interest in internships, I can help you in several ways:

1. **Profile Analysis**: I can analyze your skills and suggest relevant internship opportunities
2. **Resume Tips**: Help improve your resume for better internship applications
3. **Interview Preparation**: Provide common internship interview questions and answers
4. **Industry Insights**: Share information about different sectors and their internship programs

Would you like me to help with any specific aspect? You can also use the "Enter your profile" feature on the home page for personalized recommendations.`;
        }
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
            return `Great question about skills! Here are some in-demand skills for internships:

**Technical Skills:**
- Programming (Python, JavaScript, Java)
- Data Analysis (Excel, SQL, Python)
- Digital Marketing (SEO, Social Media)
- Design (Figma, Adobe Creative Suite)

**Soft Skills:**
- Communication and teamwork
- Problem-solving and critical thinking
- Time management and organization
- Adaptability and learning agility

**Industry-Specific Skills:**
- Finance: Financial modeling, accounting principles
- Marketing: Content creation, analytics tools
- Tech: Version control (Git), cloud platforms
- Healthcare: Medical terminology, patient care

Which area interests you most? I can provide more specific guidance!`;
        }
        
        if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return `Here are key tips for an effective internship resume:

**Structure:**
1. Contact Information
2. Professional Summary (2-3 lines)
3. Education (include relevant coursework, GPA if 3.5+)
4. Experience (internships, part-time jobs, projects)
5. Skills (technical and soft skills)
6. Achievements/Certifications

**Best Practices:**
- Keep it to 1-2 pages maximum
- Use action verbs (achieved, developed, managed)
- Quantify achievements where possible
- Tailor for each application
- Use a clean, professional format
- Proofread carefully

**For Students/Fresh Graduates:**
- Highlight academic projects
- Include relevant coursework
- Mention leadership roles or volunteer work
- Focus on transferable skills

Would you like me to review any specific section of your resume?`;
        }
        
        if (lowerMessage.includes('interview')) {
            return `Here are common internship interview questions and how to approach them:

**Common Questions:**
1. "Tell me about yourself" - Brief professional summary
2. "Why this internship?" - Show research and genuine interest
3. "What are your strengths/weaknesses?" - Be honest but constructive
4. "Where do you see yourself in 5 years?" - Show ambition and growth mindset

**Preparation Tips:**
- Research the company thoroughly
- Prepare specific examples using STAR method (Situation, Task, Action, Result)
- Practice common questions out loud
- Prepare thoughtful questions to ask them
- Dress professionally and arrive early

**Questions to Ask Them:**
- What does a typical day look like?
- What projects would I work on?
- How do you measure success for interns?
- What opportunities are there for learning and growth?

Would you like me to help you practice answers to any specific questions?`;
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return `Hello! I'm your AI career assistant. I'm here to help you with:

🎯 **Internship Guidance** - Finding the right opportunities
📝 **Resume & Application Help** - Making your application stand out  
💼 **Interview Preparation** - Practice and tips for success
🚀 **Career Planning** - Mapping your professional journey
📚 **Skill Development** - Learning what employers want

What would you like to explore today? Feel free to ask me anything about internships, career development, or professional growth!`;
        }
        
        // Default response
        return `I understand you're asking about "${message}". As your AI career assistant, I can help with:

- **Internship search and applications**
- **Resume writing and optimization** 
- **Interview preparation and practice**
- **Career planning and skill development**
- **Industry insights and trends**

Could you provide more details about what specific aspect you'd like help with? I'm here to support your professional journey!`;
    }

    addMessage(role, content, isStreaming = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = role === 'user' ? '👤' : '🤖';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isStreaming) {
            contentDiv.innerHTML = `<p>${this.escapeHtml(content)}<span class="cursor">|</span></p>`;
            messageDiv.classList.add('streaming');
        } else {
            contentDiv.innerHTML = `<p>${this.formatMessage(content)}</p>`;
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Store message
        this.messages.push({ role, content, timestamp: Date.now() });
        this.saveChatHistory();
        
        return messageDiv;
    }

    updateStreamingMessage(messageElement, content) {
        const contentDiv = messageElement.querySelector('.message-content p');
        contentDiv.innerHTML = `${this.escapeHtml(content)}<span class="cursor">|</span>`;
        this.scrollToBottom();
    }

    finalizeStreamingMessage(messageElement) {
        messageElement.classList.remove('streaming');
        const cursor = messageElement.querySelector('.cursor');
        if (cursor) {
            cursor.remove();
        }
        
        // Update the content with proper formatting
        const contentDiv = messageElement.querySelector('.message-content p');
        const content = contentDiv.textContent.replace('|', '');
        contentDiv.innerHTML = this.formatMessage(content);
    }

    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        return this.escapeHtml(content)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setStreamingState(streaming) {
        this.isStreaming = streaming;
        this.sendButton.disabled = streaming || this.chatInput.value.trim().length === 0;
        
        if (streaming) {
            this.sendIcon.style.display = 'none';
            this.loadingIcon.style.display = 'inline';
            this.sendButton.classList.add('loading');
        } else {
            this.sendIcon.style.display = 'inline';
            this.loadingIcon.style.display = 'none';
            this.sendButton.classList.remove('loading');
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    clearChat() {
        if (confirm(window.i18n ? window.i18n.t('confirm_clear_chat') : 'Are you sure you want to clear the chat?')) {
            this.messages = [];
            this.chatMessages.innerHTML = `
                <div class="welcome-message">
                    <div class="ai-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p data-i18n="welcome_message">Hello! I'm your AI assistant. I can help you with internship recommendations, career advice, or answer any questions you have. How can I assist you today?</p>
                        </div>
                    </div>
                </div>
            `;
            this.saveChatHistory();
            
            // Re-apply translations
            if (window.i18n) {
                window.i18n.apply();
            }
        }
    }

    loadChatHistory() {
        const saved = localStorage.getItem('chatHistory');
        const savedModel = localStorage.getItem('selectedChatModel');
        
        if (savedModel) {
            this.selectedModel = savedModel;
            this.modelSelect.value = savedModel;
        }
        
        if (saved) {
            try {
                this.messages = JSON.parse(saved);
                this.renderMessages();
            } catch (e) {
                console.warn('Failed to load chat history:', e);
            }
        }
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    }

    renderMessages() {
        // Clear existing messages except welcome
        const welcome = this.chatMessages.querySelector('.welcome-message');
        this.chatMessages.innerHTML = '';
        if (this.messages.length === 0 && welcome) {
            this.chatMessages.appendChild(welcome);
        }
        
        // Render saved messages
        this.messages.forEach(msg => {
            this.addMessage(msg.role, msg.content);
        });
    }

    // Method to stop current streaming
    stopStreaming() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
        this.setStreamingState(false);
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatInterface = new ChatInterface();
});
