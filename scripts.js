$(document).ready(function() {
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });
    
    // Mobile menu toggle with animation
    $('.mobile-menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
        
        if ($('.main-menu').hasClass('active')) {
            $(this).find('span:nth-child(1)').css({
                'transform': 'rotate(45deg) translate(5px, 5px)'
            });
            $(this).find('span:nth-child(2)').css({
                'opacity': '0'
            });
            $(this).find('span:nth-child(3)').css({
                'transform': 'rotate(-45deg) translate(5px, -5px)'
            });
        } else {
            $(this).find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });
    
    // Smooth scrolling for navigation
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const navHeight = $('header').outerHeight();
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - navHeight
            }, 800, 'easeInOutQuad');
            
            // Close mobile menu if open
            if ($('.main-menu').hasClass('active')) {
                $('.mobile-menu-toggle').click();
            }
        }
    });
    
    // AOS alternative - reveal elements on scroll
    function revealOnScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        
        $('section').each(function() {
            var sectionTop = $(this).offset().top;
            
            if (scrollTop + windowHeight * 0.8 > sectionTop && !$(this).hasClass('section-visible')) {
                $(this).addClass('section-visible');
            }
        });
        
        $('.feature-card, .service-card').each(function(index) {
            var elementTop = $(this).offset().top;
            
            if (scrollTop + windowHeight * 0.85 > elementTop && !$(this).hasClass('element-visible')) {
                setTimeout(() => {
                    $(this).addClass('element-visible');
                }, index * 100);
            }
        });
    }
    
    // Run on page load
    revealOnScroll();
    
    // Run on scroll
    $(window).scroll(function() {
        revealOnScroll();
    });
    
    // Initialize slider
    function initSlider() {
        // Reset slide width on window resize
        slideWidth = $slides.width() + 25;
        
        // Set active slide and dot
        goToSlide(currentSlide);
        
        // Start auto sliding
        startAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        currentSlide = index;
        
        // Update dots
        $dots.removeClass('active');
        $dots.eq(currentSlide).addClass('active');
        
        // Smooth scroll to the target slide
        const scrollPos = currentSlide * slideWidth;
        $slider.animate({
            scrollLeft: scrollPos
        }, 600, 'easeInOutCubic');
    }
    
    // Start automatic sliding
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Next slide button click
    $('.control-next').click(function() {
        goToSlide(currentSlide + 1);
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Previous slide button click
    $('.control-prev').click(function() {
        goToSlide(currentSlide - 1);
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Pagination dots click
    $('.pagination-dot').click(function() {
        const index = $(this).index();
        goToSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Pause auto-slide when hovering over the slider
    $slider.hover(
        function() { stopAutoSlide(); },
        function() { startAutoSlide(); }
    );
    
    // Initialize slider on page load
    initSlider();
    
    // Reinitialize slider on window resize
    $(window).resize(function() {
        initSlider();
    });
    
    


    // jQuery easing functions for smoother animations
    $.extend($.easing, {
        easeInOutCubic: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        easeInOutQuad: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    });
    
    // Add keyframe animation for form validation shake effect
    if (!document.getElementById('shake-animation')) {
        $("<style id='shake-animation'>")
            .text(`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-5px); }
                    40%, 80% { transform: translateX(5px); }
                }
                .shake {
                    animation: shake 0.5s ease;
                }
            `)
            .appendTo("head");
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const indicators = document.querySelectorAll('.indicator');
    const contents = document.querySelectorAll('.testimonial-content');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let interval;
    const autoplayDelay = 5000; // وقت التبديل التلقائي بالمللي ثانية
    
    // تغيير الشهادة النشطة
    function changeSlide(index) {
        // التعامل مع الحالات الحدية
        if (index < 0) {
            index = contents.length - 1;
        } else if (index >= contents.length) {
            index = 0;
        }
        
        // إزالة الفئة النشطة من جميع العناصر
        indicators.forEach(indicator => indicator.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        
        // إضافة الفئة النشطة للعنصر الحالي
        indicators[index].classList.add('active');
        contents[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // البدء من الأول
    changeSlide(0);
    
    // بدء التدوير التلقائي
    function startAutoplay() {
        clearInterval(interval);
        interval = setInterval(() => {
            changeSlide(currentIndex + 1);
        }, autoplayDelay);
    }
    
    // إيقاف التدوير التلقائي
    function stopAutoplay() {
        clearInterval(interval);
    }
    
    // معالجة النقر على المؤشرات
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            changeSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // معالجة النقر على زر السابق
    prevBtn.addEventListener('click', () => {
        changeSlide(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
    });
    
    // معالجة النقر على زر التالي
    nextBtn.addEventListener('click', () => {
        changeSlide(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
    });
    
    // بدء التدوير التلقائي
    startAutoplay();
    
    // إيقاف التدوير التلقائي عند حوم المؤشر
    const testimonialsSection = document.querySelector('.testimonials-modern');
    testimonialsSection.addEventListener('mouseenter', stopAutoplay);
    testimonialsSection.addEventListener('mouseleave', startAutoplay);
});


document.addEventListener('DOMContentLoaded', function() {
    // تعامل مع الواجهة الطافية للنماذج
    const formGroups = document.querySelectorAll('.form-group.floating');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        // عند بدء التحميل
        if (input.value) {
            label.classList.add('active');
        }
        
        // منع ظهور placeholder
        if (input.getAttribute('placeholder') === null) {
            input.setAttribute('placeholder', ' ');
        }
        
        // التركيز
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        // فقدان التركيز
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
        
        // التعامل مع select
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                if (input.value) {
                    label.classList.add('active');
                }
            });
        }
    });
    
    // معالجة تقديم النموذج
    const registerForm = document.querySelector('.register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // عرض حالة التحميل
            const submitBtn = this.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            btnText.textContent = 'جاري التسجيل...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            submitBtn.disabled = true;
            
            // محاكاة إرسال النموذج (استبدل هذا بطلب AJAX حقيقي)
            setTimeout(() => {
                // إظهار رسالة النجاح
                registerForm.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>تم التسجيل بنجاح!</h3>
                        <p>شكراً لانضمامك إلى Delivery Wolf. سنتواصل معك قريباً لإكمال عملية التسجيل.</p>
                    </div>
                `;
                
                // إضافة CSS للرسالة الناجحة
                const style = document.createElement('style');
                style.textContent = `
                    .success-message {
                        text-align: center;
                        padding: 40px 20px;
                        animation: fadeIn 0.5s ease;
                    }
                    
                    .success-icon {
                        font-size: 70px;
                        color: #00E5FF;
                        margin-bottom: 20px;
                    }
                    
                    .success-message h3 {
                        font-size: 1.8rem;
                        margin-bottom: 15px;
                        color: #ffffff;
                    }
                    
                    .success-message p {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 1.1rem;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `;
                document.head.appendChild(style);
                
            }, 2000);
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // تحديث سنة حقوق النشر
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // تمرير سلس للروابط الداخلية
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // تطبيق فقط على الروابط التي تبدأ بـ #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // تجاهل الروابط التي تشير إلى # فقط (الصفحة الرئيسية)
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // احسب ارتفاع الهيدر للتعويض عنه عند التمرير
                    const headerOffset = document.querySelector('.modern-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    // تمرير سلس إلى القسم المستهدف
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    const mainMenu = document.querySelector('.main-menu');
                    if (mainMenu.classList.contains('active')) {
                        document.querySelector('.mobile-menu-toggle').click();
                    }
                }
            }
        });
    });
    
    // تعيين القسم النشط عند التمرير
    function setActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.modern-header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // إضافة هامش إضافي
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // إذا كان المستخدم في أعلى الصفحة، جعل "الرئيسية" نشطًا
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // تشغيل عند التمرير
    window.addEventListener('scroll', setActiveSection);
    
    // تشغيل عند تحميل الصفحة
    setActiveSection();
});


document.addEventListener('DOMContentLoaded', function() {
    // التقاط جميع الروابط التي تبدأ بـ #
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    // إضافة مستمع حدث لكل رابط
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // الحصول على الهدف من خلال السمة href
            const targetId = this.getAttribute('href');
            
            // تخطي الروابط مع # فقط (روابط الرئيسية)
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // الحصول على العنصر المستهدف
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // الحصول على ارتفاع الهيدر
                const header = document.querySelector('.modern-header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                // حساب الموضع مع الأخذ في الاعتبار ارتفاع الهيدر
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                // التمرير إلى الموضع
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});