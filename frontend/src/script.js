document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('btn-profile');
    const resumeBtn = document.getElementById('btn-resume');

    profileBtn?.addEventListener('click', () => {
        window.location.href = 'profile.html';
    });

    resumeBtn?.addEventListener('click', () => {
        window.location.href = 'resume.html';
    });
});


