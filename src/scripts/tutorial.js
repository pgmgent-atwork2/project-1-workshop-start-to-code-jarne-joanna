// When the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // === Progress Bar ===
    const progressBar = document.querySelector('.progress-bar');
    
    // Update progress bar as user scrolls
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // === Copy Button for Code Blocks ===
    // Add copy buttons to all code blocks if they don't exist
    const codeBlocks = document.querySelectorAll('.tutorial-content .code-block');
    
    codeBlocks.forEach(block => {
        // Check if button already exists
        if (!block.querySelector('.copy-btn')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copy';
            block.appendChild(copyBtn);
        }
    });

    // Add click event to all copy buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn')) {
            const codeBlock = e.target.closest('.code-block');
            const code = codeBlock.querySelector('code').textContent;
            
            // Copy text to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Change button text temporarily
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
    });

    // === Table of Contents Active Link ===
    const sections = document.querySelectorAll('.tutorial-content .section');
    const tocLinks = document.querySelectorAll('.tutorial-content .table-of-contents a');

    // Highlight the active section in table of contents
    function highlightActiveSection() {
        let currentActiveSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100 && 
                window.scrollY < sectionTop + sectionHeight - 100) {
                currentActiveSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentActiveSection) {
                link.classList.add('active');
            }
        });
    }

    // Initial highlight and on scroll
    highlightActiveSection();
    window.addEventListener('scroll', highlightActiveSection);

    // === Smooth Scrolling for Navigation Links ===
    document.querySelectorAll('.tutorial-content a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });


});