if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// 1. DATA ARCHITECTURE
// ----------------------------------------------------------------------
// HOMEPAGE: Just 6 highlight items
const homepageGalleryData = [
    { type: 'image', src: 'assets/content/gallery/photo-1.jpg', heightClass: 'h-[45vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-1.mp4',   heightClass: 'h-[60vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-2.jpg', heightClass: 'h-[50vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-3.jpg', heightClass: 'h-[40vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-2.mp4',   heightClass: 'h-[55vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-4.jpg', heightClass: 'h-[45vh]' }
];

// FULL GALLERY PAGE: All 33 Items (20 Videos, 13 Images)
const fullGalleryData = [
    { type: 'video', src: 'assets/content/gallery/vid-1.mp4',   heightClass: 'h-[50vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-1.jpg', heightClass: 'h-[40vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-2.mp4',   heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-3.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-2.jpg', heightClass: 'h-[55vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-4.mp4',   heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-5.mp4',   heightClass: 'aspect-square' },
    { type: 'image', src: 'assets/content/gallery/photo-3.jpg', heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-6.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-4.jpg', heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-7.mp4',   heightClass: 'h-[55vh]' },

    { type: 'video', src: 'assets/content/gallery/vid-8.mp4',   heightClass: 'h-[50vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-5.jpg', heightClass: 'h-[40vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-9.mp4',   heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-10.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-6.jpg', heightClass: 'h-[55vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-11.mp4',   heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-12.mp4',   heightClass: 'aspect-square' },
    { type: 'image', src: 'assets/content/gallery/photo-7.jpg', heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-13.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-8.jpg', heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-14.mp4',   heightClass: 'h-[55vh]' },

    { type: 'video', src: 'assets/content/gallery/vid-15.mp4',   heightClass: 'h-[50vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-9.jpg', heightClass: 'h-[40vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-16.mp4',   heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-17.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-10.jpg', heightClass: 'h-[55vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-18.mp4',   heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-19.mp4',   heightClass: 'aspect-square' },
    { type: 'image', src: 'assets/content/gallery/photo-11.jpg', heightClass: 'h-[60vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-20.mp4',   heightClass: 'h-[45vh]' },
    { type: 'image', src: 'assets/content/gallery/photo-12.jpg', heightClass: 'h-[50vh]' },
    { type: 'video', src: 'assets/content/gallery/vid-21.mp4',   heightClass: 'h-[55vh]' },
    // --> JUNIOR DEV: Add the remaining 22 items here following the exact same pattern!
];

// ----------------------------------------------------------------------
// 2. SMOOTH SCROLL INIT
// ----------------------------------------------------------------------
const lenis = new Lenis({
    duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smooth: true,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ----------------------------------------------------------------------
// 3. CORE LOGIC
// ----------------------------------------------------------------------
window.addEventListener('load', () => {

    // --- MOBILE MENU TOGGLE LOGIC ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            const lines = menuBtn.querySelectorAll('span');

            if (isMenuOpen) {
                // Slide in overlay
                menuOverlay.classList.remove('translate-x-full');
                menuOverlay.classList.add('translate-x-0');
                // Animate lines to "X"
                lines[0].style.transform = 'translateY(5px) rotate(45deg)';
                lines[1].style.transform = 'translateY(-5px) rotate(-45deg)';
                // Lock scrolling
                document.body.style.overflow = 'hidden';
            } else {
                // Slide out overlay
                menuOverlay.classList.remove('translate-x-0');
                menuOverlay.classList.add('translate-x-full');
                // Revert lines
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
                // Unlock scrolling
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                menuOverlay.classList.remove('translate-x-0');
                menuOverlay.classList.add('translate-x-full');
                
                const lines = menuBtn.querySelectorAll('span');
                lines[0].style.transform = 'none';
                lines[1].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
    }

    // --- GALLERY BUILD LOGIC ---
    function renderGallery(containerId, dataArray) {
        const container = document.getElementById(containerId);
        if (!container) return; 

        const col1 = document.createElement('div'); col1.className = 'flex flex-col gap-6 md:gap-10 flex-1';
        const col2 = document.createElement('div'); col2.className = 'flex flex-col gap-6 md:gap-10 flex-1 md:mt-24';
        const col3 = document.createElement('div'); col3.className = 'flex flex-col gap-6 md:gap-10 flex-1 md:-mt-12';

        dataArray.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = `gallery-item w-full overflow-hidden rounded-xl bg-navy/5 parallax-layer transform-gpu relative`;
            
            const fallback = "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800";
            
            if (item.type === 'video') {
                el.innerHTML = `<video src="${item.src}" class="w-full ${item.heightClass} object-cover" autoplay loop muted playsinline></video>`;
            } else {
                el.innerHTML = `<img src="${item.src}" onerror="this.src='${fallback}'" class="w-full ${item.heightClass} object-cover" loading="lazy" alt="Gallery Showcase">`;
            }
            
            if (index % 3 === 0) col1.appendChild(el);
            else if (index % 3 === 1) col2.appendChild(el);
            else col3.appendChild(el);
        });
        container.append(col1, col2, col3);
    }

    renderGallery('homepage-gallery-grid', homepageGalleryData);
    renderGallery('full-gallery-grid', fullGalleryData);

    // --- Header Scroll Logic ---
    const header = document.getElementById('main-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-navy/90', 'backdrop-blur-md', 'border-cream/10', 'py-4');
                header.classList.remove('py-6', 'border-transparent');
            } else {
                if(!document.getElementById('full-gallery-grid')) {
                    header.classList.remove('bg-navy/90', 'backdrop-blur-md', 'border-cream/10', 'py-4');
                    header.classList.add('py-6', 'border-transparent');
                }
            }
        });
    }

    // --- Homepage Animations ---
    if (document.getElementById('homepage-gallery-grid')) {
        setTimeout(() => {
            const heroLines = document.querySelectorAll('.hero-title-line > span');
            heroLines.forEach(line => {
                line.classList.remove('translate-y-full');
                line.classList.add('translate-y-0');
            });
            document.querySelector('.hero-subtitle')?.classList.remove('opacity-0', 'translate-y-8');
            document.querySelector('.hero-subtitle')?.classList.add('opacity-100', 'translate-y-0');
        }, 200);

        const heroWrapper = document.querySelector('.hero-pin-wrapper');
        const hero3dWrapper = document.querySelector('.hero-3d-wrapper');
        
        if (heroWrapper && hero3dWrapper) {
            gsap.to(hero3dWrapper, {
                scale: 0.8, rotateX: 10, y: '5vh', opacity: 0.3, borderRadius: '40px', ease: "none",
                scrollTrigger: { trigger: heroWrapper, start: "top top", end: "+=150%", scrub: 1, pin: true }
            });
            gsap.to('.hero-title, .hero-subtitle, .scroll-indicator', {
                y: -100, opacity: 0, ease: "none",
                scrollTrigger: { trigger: heroWrapper, start: "top top", end: "+=80%", scrub: 1 }
            });
        }

        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            let track = document.querySelector(".timeline-track");
            let items = gsap.utils.toArray(".timeline-item");
            
            if(track && items.length > 0) {
                let scrollTween = gsap.to(items, {
                    xPercent: -100 * (items.length - 1), ease: "none",
                    scrollTrigger: {
                        trigger: ".timeline-wrapper", pin: true, start: "top top",
                        end: () => "+=" + (track.scrollWidth * 1.5), scrub: 1.5, invalidateOnRefresh: true
                    }
                });

                items.forEach((item) => {
                    let mediaContainer = item.querySelector('.image-reveal-container');
                    if (mediaContainer) {
                        gsap.from(mediaContainer, {
                            scale: 0.8, opacity: 0.5, ease: "power2.out",
                            scrollTrigger: {
                                trigger: item, containerAnimation: scrollTween,
                                start: "left 80%", end: "center center", scrub: 1,
                            }
                        });
                    }

                    let textContent = item.querySelector('.horizontal-text-content');
                    if (textContent) {
                        gsap.from(textContent.children, {
                            y: 40, opacity: 0, stagger: 0.1, ease: "power2.out",
                            scrollTrigger: {
                                trigger: item, containerAnimation: scrollTween,
                                start: "left 70%", end: "center center", scrub: 1,
                            }
                        });
                    }
                });
            }
        });
    }

    // --- Dynamic Gallery Fluid 3D Entry Animation ---
    const galleryItems = gsap.utils.toArray('.parallax-layer');
    
    galleryItems.forEach((item) => {
        const randomStartOffset = Math.random() * 50 + 80;
        
        gsap.from(item, {
            opacity: 0, 
            y: randomStartOffset, 
            rotateX: 15, 
            scale: 0.9, 
            duration: 1.5, 
            ease: "expo.out",
            scrollTrigger: {
                trigger: item, 
                start: "top 95%", 
                toggleActions: "play none none reverse"
            }
        });
    });

    // --- Magnetic Button Interactivity ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power3.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });
});
