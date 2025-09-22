/**
 * AI Service for Internship Recommendations
 * Integrates with the AI model to provide personalized internship suggestions
 */

class AIRecommendationService {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3000/api'; // Backend API endpoint
        this.isInitialized = false;
    }

    /**
     * Initialize the AI service
     */
    async initialize() {
        try {
            // Check if AI service is available
            const response = await fetch(`${this.apiBaseUrl}/health`);
            this.isInitialized = response.ok;
            return this.isInitialized;
        } catch (error) {
            console.warn('AI service not available, using mock data');
            this.isInitialized = false;
            return false;
        }
    }

    /**
     * Get internship recommendations based on user profile
     * @param {Object} profile - User profile data
     * @returns {Promise<Array>} Array of recommended internships
     */
    async getRecommendations(profile) {
        if (!profile) {
            throw new Error('Profile data is required');
        }

        try {
            if (this.isInitialized) {
                // Call actual AI service
                const response = await fetch(`${this.apiBaseUrl}/recommendations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profile)
                });

                if (!response.ok) {
                    throw new Error('Failed to get recommendations from AI service');
                }

                return await response.json();
            } else {
                // Return mock recommendations for development
                return this.getMockRecommendations(profile);
            }
        } catch (error) {
            console.error('Error getting recommendations:', error);
            // Fallback to mock data
            return this.getMockRecommendations(profile);
        }
    }

    /**
     * Generate mock recommendations for development/fallback
     * @param {Object} profile - User profile data
     * @returns {Array} Mock internship recommendations
     */
    getMockRecommendations(profile) {
        const mockInternships = [
            {
                id: 1,
                title: "Digital Marketing Intern",
                company: "TechStart Solutions",
                location: "Mumbai, Maharashtra",
                duration: "3 months",
                stipend: "₹15,000/month",
                skills: ["Digital Marketing", "Social Media", "Content Creation"],
                description: "Work on digital marketing campaigns and social media strategy for emerging tech startups.",
                matchScore: 95,
                matchReasons: ["Matches your interest in marketing", "Located in preferred area", "Suitable for your skill level"]
            },
            {
                id: 2,
                title: "Software Development Intern",
                company: "Innovation Labs",
                location: "Bangalore, Karnataka",
                duration: "6 months",
                stipend: "₹20,000/month",
                skills: ["JavaScript", "React", "Node.js"],
                description: "Develop web applications and contribute to open-source projects in a collaborative environment.",
                matchScore: 88,
                matchReasons: ["Aligns with your technical skills", "Good learning opportunity", "Competitive stipend"]
            },
            {
                id: 3,
                title: "Business Analysis Intern",
                company: "Corporate Solutions Inc",
                location: "Delhi, NCR",
                duration: "4 months",
                stipend: "₹18,000/month",
                skills: ["Data Analysis", "Excel", "Business Strategy"],
                description: "Analyze business processes and help optimize operations for better efficiency.",
                matchScore: 82,
                matchReasons: ["Matches your analytical interests", "Good career growth", "Flexible working hours"]
            },
            {
                id: 4,
                title: "Content Writing Intern",
                company: "Creative Media House",
                location: "Pune, Maharashtra",
                duration: "3 months",
                stipend: "₹12,000/month",
                skills: ["Content Writing", "SEO", "Research"],
                description: "Create engaging content for websites, blogs, and social media platforms.",
                matchScore: 78,
                matchReasons: ["Suits your communication skills", "Creative work environment", "Portfolio building opportunity"]
            },
            {
                id: 5,
                title: "Data Science Intern",
                company: "Analytics Pro",
                location: "Hyderabad, Telangana",
                duration: "5 months",
                stipend: "₹22,000/month",
                skills: ["Python", "Machine Learning", "Statistics"],
                description: "Work with real datasets to build predictive models and generate business insights.",
                matchScore: 75,
                matchReasons: ["High growth field", "Excellent mentorship", "Hands-on experience with AI/ML"]
            }
        ];

        // Simple matching logic based on profile
        const filteredInternships = mockInternships.filter(internship => {
            if (profile.location) {
                const userLocation = profile.location.toLowerCase();
                const internshipLocation = internship.location.toLowerCase();
                // Check if locations match (city or state)
                if (!internshipLocation.includes(userLocation) && !userLocation.includes(internshipLocation.split(',')[0])) {
                    return false;
                }
            }
            return true;
        });

        // Return top 3-5 recommendations
        return filteredInternships.slice(0, 5).map(internship => ({
            ...internship,
            appliedFilters: this.getAppliedFilters(profile, internship)
        }));
    }

    /**
     * Get applied filters explanation
     * @param {Object} profile - User profile
     * @param {Object} internship - Internship data
     * @returns {Array} Applied filters
     */
    getAppliedFilters(profile, internship) {
        const filters = [];
        
        if (profile.skills) {
            const userSkills = profile.skills.toLowerCase().split(',').map(s => s.trim());
            const internshipSkills = internship.skills.map(s => s.toLowerCase());
            const matchingSkills = userSkills.filter(skill => 
                internshipSkills.some(iSkill => iSkill.includes(skill) || skill.includes(iSkill))
            );
            if (matchingSkills.length > 0) {
                filters.push(`Skills match: ${matchingSkills.join(', ')}`);
            }
        }

        if (profile.location && internship.location.toLowerCase().includes(profile.location.toLowerCase())) {
            filters.push(`Location preference: ${profile.location}`);
        }

        if (profile.interests) {
            const interests = profile.interests.toLowerCase();
            if (internship.title.toLowerCase().includes(interests) || 
                internship.description.toLowerCase().includes(interests)) {
                filters.push(`Interest match: ${profile.interests}`);
            }
        }

        return filters;
    }

    /**
     * Analyze resume and extract profile data
     * @param {File} resumeFile - Resume file
     * @returns {Promise<Object>} Extracted profile data
     */
    async analyzeResume(resumeFile) {
        // This would integrate with OCR service from the AI model
        // For now, return mock extracted data
        return {
            education: "Bachelor's in Computer Science",
            skills: "JavaScript, Python, Data Analysis",
            experience: "2 years",
            interests: "Technology, Software Development"
        };
    }
}

// Create global instance
window.aiService = new AIRecommendationService();

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await window.aiService.initialize();
});
