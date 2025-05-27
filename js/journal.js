// Journal Flipbook Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the flipbook
    const flipbook = $('#flipbook');
    
    // Check if jQuery and turn.js are loaded
    if (typeof jQuery === 'undefined') {
        console.error('jQuery is required for the flipbook effect');
        return;
    }
    
    // Initialize the flipbook with CSS 3D transforms
    try {
        flipbook.turn({
            width: 800,
            height: 600,
            autoCenter: true,
            duration: 1000,
            gradients: true,
            acceleration: true,
            elevation: 50,
            pages: 12,
            when: {
                turning: function(e, page, view) {
                    // Create confetti effect when turning pages
                    if (typeof window.createConfetti === 'function') {
                        window.createConfetti();
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing flipbook:', error);
        // Fallback to simple CSS transitions if turn.js fails
        initFallbackFlipbook();
    }
    
    // Add event listeners for the navigation buttons
    $('#prev-page').on('click', function() {
        flipbook.turn('previous');
    });
    
    $('#next-page').on('click', function() {
        flipbook.turn('next');
    });
    
    // Responsive adjustments
    $(window).on('resize', function() {
        adjustFlipbook();
    });
    
    adjustFlipbook();
    
    // Function to adjust flipbook size based on screen size
    function adjustFlipbook() {
        const width = Math.min($(window).width() - 40, 800);
        const height = width * 0.75; // Maintain aspect ratio
        
        flipbook.turn('size', width, height);
    }
    
    // Fallback function for browsers that don't support turn.js
    function initFallbackFlipbook() {
        console.log('Using fallback flipbook');
        
        // Hide all pages except the first one
        $('.journal-page').not(':first').hide();
        
        let currentPage = 0;
        const totalPages = $('.journal-page').length;
        
        // Show the current page
        function showPage(pageNum) {
            $('.journal-page').hide();
            $('.journal-page').eq(pageNum).show();
            currentPage = pageNum;
        }
        
        // Navigate to previous page
        $('#prev-page').on('click', function() {
            if (currentPage > 0) {
                showPage(currentPage - 1);
            }
        });
        
        // Navigate to next page
        $('#next-page').on('click', function() {
            if (currentPage < totalPages - 1) {
                showPage(currentPage + 1);
            }
        });
        
        // Show the first page
        showPage(0);
    }
});

// 3D CSS Fallback for turn.js
if (typeof jQuery !== 'undefined' && !$.fn.turn) {
    $.fn.turn = function(options) {
        console.log('Using CSS 3D fallback for turn.js');
        
        return this.each(function() {
            const $this = $(this);
            const pages = $this.children();
            let currentPage = 0;
            const totalPages = pages.length;
            
            // Initialize the flipbook
            $this.addClass('fallback-flipbook');
            pages.addClass('fallback-page');
            pages.not(':first').hide();
            
            // Add methods to the flipbook
            $this.data('turn', {
                page: function(num) {
                    if (num !== undefined) {
                        showPage(num - 1);
                    } else {
                        return currentPage + 1;
                    }
                },
                next: function() {
                    if (currentPage < totalPages - 1) {
                        showPage(currentPage + 1);
                    }
                },
                previous: function() {
                    if (currentPage > 0) {
                        showPage(currentPage - 1);
                    }
                },
                size: function(width, height) {
                    $this.css({
                        width: width,
                        height: height
                    });
                }
            });
            
            // Show a specific page with animation
            function showPage(pageNum) {
                if (pageNum === currentPage) return;
                
                const direction = pageNum > currentPage ? 'next' : 'prev';
                const $currentPage = pages.eq(currentPage);
                const $nextPage = pages.eq(pageNum);
                
                // Animate page turn
                if (direction === 'next') {
                    $currentPage.css({
                        transform: 'rotateY(-180deg)',
                        transformOrigin: 'left center'
                    }).fadeOut(500);
                    
                    $nextPage.show().css({
                        transform: 'rotateY(0deg)',
                        transformOrigin: 'left center'
                    }).fadeIn(500);
                } else {
                    $currentPage.css({
                        transform: 'rotateY(180deg)',
                        transformOrigin: 'right center'
                    }).fadeOut(500);
                    
                    $nextPage.show().css({
                        transform: 'rotateY(0deg)',
                        transformOrigin: 'right center'
                    }).fadeIn(500);
                }
                
                currentPage = pageNum;
                
                // Trigger turning event
                if (options && options.when && options.when.turning) {
                    options.when.turning.call($this, null, currentPage + 1, [currentPage + 1]);
                }
            }
            
            // Add methods to jQuery object
            $.extend($.fn.turn, {
                page: function(num) {
                    return $this.data('turn').page(num);
                },
                next: function() {
                    $this.data('turn').next();
                    return this;
                },
                previous: function() {
                    $this.data('turn').previous();
                    return this;
                },
                size: function(width, height) {
                    $this.data('turn').size(width, height);
                    return this;
                }
            });
        });
    };
}
