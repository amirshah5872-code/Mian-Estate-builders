// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Hero Reveal
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.from('.hero h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })
        .from('.hero p', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.hero .btn', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");
});

// Reveal Animations
const revealElements = (selector, options = {}) => {
    gsap.utils.toArray(selector).forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: options.y || 0,
            x: options.x || 0,
            scale: options.scale || 1,
            opacity: 0,
            duration: options.duration || 1.2,
            ease: "power3.out",
            ...options.extra
        });
    });
};

revealElements('.section-title', { y: 30 });
revealElements('.about-image', { x: -50 });
revealElements('.about-text', { x: 50 });
revealElements('.service-card', { y: 40, duration: 1 });
revealElements('.property-card', { y: 40 });
revealElements('.portfolio-item', { scale: 0.95 });
revealElements('.testimonial-card', { x: -30 });
revealElements('.team-card', { scale: 0.9, duration: 1.5 });

// Navbar change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.padding = '0.8rem 0';
        nav.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.background = 'rgba(26, 26, 26, 0.8)';
    }
});
// Calculator Logic
let activeCalcType = 'loan';

function switchCalc(type) {
    activeCalcType = type;
    const tabs = document.querySelectorAll('.calc-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const label1 = document.getElementById('label-1');
    const label2 = document.getElementById('label-2');
    const resultTitle = document.getElementById('calc-title');
    const downInput = document.getElementById('down-payment');
    const filerSelect = document.getElementById('filer-status');

    // Reset visibility
    downInput.style.display = 'block';
    filerSelect.style.display = 'none';

    if (type === 'loan') {
        label1.textContent = 'Property Value (PKR)';
        label2.textContent = 'Down Payment (%)';
        resultTitle.textContent = 'Monthly Payment Estimate';
        calculateLoan();
    } else if (type === 'installment') {
        label1.textContent = 'Total Amount (PKR)';
        label2.textContent = 'Initial Booking (%)';
        resultTitle.textContent = 'Monthly Installment (In Years)';
        calculateInstallment();
    } else if (type === 'tax') {
        label1.textContent = 'Property Value (PKR)';
        label2.textContent = 'Tax Status';
        resultTitle.textContent = 'Estimated Transfer Tax';
        downInput.style.display = 'none';
        filerSelect.style.display = 'block';
        calculateTax();
    }
}

function runCalc() {
    if (activeCalcType === 'loan') calculateLoan();
    else if (activeCalcType === 'installment') calculateInstallment();
    else if (activeCalcType === 'tax') calculateTax();
}

function calculateLoan() {
    const val = parseFloat(document.getElementById('prop-value').value) || 0;
    const down = parseFloat(document.getElementById('down-payment').value) || 0;
    const rateInput = parseFloat(document.getElementById('interest-rate').value) || 0;
    const years = parseFloat(document.getElementById('duration').value) || 0;

    const principal = val * (1 - (down / 100));
    document.getElementById('remaining-result').textContent = 'PKR ' + Math.round(principal).toLocaleString();

    if (rateInput === 0) {
        const monthly = principal / (years * 12);
        document.getElementById('loan-result').textContent = 'PKR ' + Math.round(monthly).toLocaleString();
        return;
    }

    const rate = rateInput / 100 / 12;
    const months = years * 12;
    const x = Math.pow(1 + rate, months);
    const monthly = (principal * x * rate) / (x - 1);

    document.getElementById('loan-result').textContent = 'PKR ' + Math.round(monthly).toLocaleString();
}

function calculateInstallment() {
    const val = parseFloat(document.getElementById('prop-value').value) || 0;
    const down = parseFloat(document.getElementById('down-payment').value) || 0;
    const years = parseFloat(document.getElementById('duration').value) || 1; // Default to 1 year to avoid div by zero
    const remaining = val * (1 - (down / 100));
    const monthly = remaining / (years * 12);

    document.getElementById('remaining-result').textContent = 'PKR ' + Math.round(remaining).toLocaleString();
    document.getElementById('loan-result').textContent = 'PKR ' + Math.round(monthly).toLocaleString();
}

function calculateTax() {
    const val = parseFloat(document.getElementById('prop-value').value) || 0;
    const taxRate = document.getElementById('filer-status').value;
    const tax = val * taxRate;
    document.getElementById('remaining-result').textContent = 'PKR 0'; // Not applicable for tax
    document.getElementById('loan-result').textContent = 'PKR ' + Math.round(tax).toLocaleString();
}

// Translation Data
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Services",
        nav_portfolio: "Portfolio",
        nav_tools: "Tools",
        nav_contact: "Contact",
        hero_h1: "Building Your Future",
        hero_p: "Premium Property Solutions & Architectural Excellence",
        hero_btn: "Get Started",
        about_title: "Who We Are",
        about_desc: "Welcome to Mian Estate & Builders, founded by Mian Akbar. We specialize in high-end real estate and modern construction. From grey structures to turn-key luxury homes, we deliver excellence in every brick.",
        stat_exp_val: "25+",
        stat_exp_label: "Years Experience",
        stat_proj_val: "250+",
        stat_proj_label: "Projects Done",
        services_title: "Our Expertise",
        service_1_h3: "Premium Real Estate",
        service_1_p: "Hmary pas commercial shops, commercial or residential plots aur bnay bnaay modern tarz k luxury or spanish homes mojood hen.",
        service_2_h3: "Plot Aapka, Zimadari Hamari",
        service_2_p: "Lahore ya Lahore se bahar kahin bhi aapka plot ho, us par aik behatreen ghar bna kar dena ab hamari zimadari hai, A + material k sath.",
        service_3_h3: "DHA Phase 9 Prism",
        service_3_p: "Ring Road DHA Prism 9 mein perfection k sath (Construction) ke liye Experienced Developer Mian Akbar ki khidmat hasil kren.",
        properties_title: "Featured Properties",
        properties_desc: "Explore our curated selection of premium real estate.",
        badge_sale: "For Sale",
        prop_1_price: "PKR 8.5 Crore",
        prop_1_h3: "Royal Skyline Villa",
        prop_1_p: "Pak Arab Housing Scheme, Lahore",
        feat_bed: "🛏️ 5 Beds",
        feat_bath: "🚿 6 Baths",
        feat_area: "📏 1 Kanal",
        badge_new: "New Launch",
        prop_2_price: "PKR 1.2 Crore",
        prop_2_h3: "Elite Heights Plaza",
        prop_2_p: "Ferozepur Road, Lahore",
        feat_comm: "🏙️ Commercial",
        feat_grey: "🏗️ Grey Structure",
        feat_area_2: "📏 5 Marla",
        tools_title: "Premium Planning Tools",
        tab_loan: "Loan Calculator",
        tab_inst: "Installment Plan",
        tab_tax: "Tax Estimator",
        calc_result_title: "Monthly Payment Estimate",
        calc_rem_title: "Remaining Balance",
        portfolio_title: "Selected Projects",
        port_1_h3: "Grand Residency",
        port_1_p: "Luxury Construction",
        port_2_h3: "Modern Build",
        port_2_p: "Under Construction",
        port_3_h3: "Marble Palace",
        port_3_p: "Premium Finishing",
        port_4_h3: "Aqua Oasis",
        port_4_p: "Luxury Lifestyle",
        testimonials_title: "Client Stories",
        test_1_text: "\"Mian Estate delivered our dream home 2 months ahead of schedule. The quality of the grey structure is exceptional!\"",
        test_1_name: "Sheikh Salman",
        test_1_pos: "Business Owner",
        test_2_text: "\"The most transparent real estate service in Lahore. Mian Akbar personally guided us through the entire process.\"",
        test_2_name: "Ali Raza",
        test_2_pos: "Investor",
        ceo_pos: "Founder & CEO",
        footer_title: "Contact Us",
        footer_desc: "Ready to build your dream? Reach out today.",
        footer_addr: "📍 494 commercial block F Pak arab housing scheme Ferozepur road Lahore",
        footer_map: "View on Google Maps",
        footer_phone1: "📞 0322 4406590",
        footer_phone2: "📞 0300 8467938",
        footer_email: "📧 mianpakarb156c@gmail.com",
        contact_name: "Your Name",
        contact_email: "Your Email",
        contact_phone: "Your Phone Number",
        contact_msg: "Message",
        contact_send: "Send Message",
        whatsapp_btn: "Chat on WhatsApp"
    },
    ur: {
        nav_home: "ہوم",
        nav_about: "ہمارے بارے میں",
        nav_services: "خدمات",
        nav_portfolio: "پورٹ فولیو",
        nav_tools: "ٹولز",
        nav_contact: "رابطہ",
        hero_h1: "اپنا مستقبل تعمیر کریں",
        hero_p: "پریمیئم پراپرٹی حل اور آرکیٹیکچرل عمدگی",
        hero_btn: "شروع کریں",
        about_title: "ہم کون ہیں",
        about_desc: "میاں اسٹیٹ اینڈ بلڈرز میں خوش آمدید، جس کی بنیاد میاں اکبر نے رکھی ہے۔ ہم ہائی اینڈ رئیل اسٹیٹ اور جدید تعمیرات میں مہارت رکھتے ہیں۔ گرے اسٹرکچر سے لے کر پرتعیش گھروں تک، ہم ہر اینٹ میں عمدگی فراہم کرتے ہیں۔",
        stat_exp_val: "+25",
        stat_exp_label: "سالہ تجربہ",
        stat_proj_val: "+250",
        stat_proj_label: "مکمل شدہ پروجیکٹس",
        services_title: "ہماری مہارت",
        service_1_h3: "پریمیئم رئیل اسٹیٹ",
        service_1_p: "ہمارے پاس کمرشل دکانیں، کمرشل اور رہائشی پلاٹ اور جدید طرز کے پرتعیش گھر موجود ہیں۔",
        service_2_h3: "پلاٹ آپ کا، ذمہ داری ہماری",
        service_2_p: "لاہور یا لاہور سے باہر کہیں بھی آپ کا پلاٹ ہو، اس پر بہترین گھر بنا کر دینا اب ہماری ذمہ داری ہے، اے پلس میٹریل کے ساتھ۔",
        service_3_h3: "ڈی ایچ اے فیز 9 پرزم",
        service_3_p: "رنگ روڈ ڈی ایچ اے پرزم 9 میں تعمیراتی کام کے لیے تجربہ کار ڈویلپر میاں اکبر کی خدمات حاصل کریں۔",
        properties_title: "نمایاں پراپرٹیز",
        properties_desc: "ہماری منتخب کردہ پریمیئم رئیل اسٹیٹ دیکھیں۔",
        badge_sale: "برائے فروخت",
        prop_1_price: "8.5 کروڑ روپے",
        prop_1_h3: "رائل اسکائی لائن ولا",
        prop_1_p: "پاک عرب ہاؤسنگ اسکیم، لاہور",
        feat_bed: "🛏️ 5 بیڈز",
        feat_bath: "🚿 6 باتھ",
        feat_area: "📏 1 کنال",
        badge_new: "نیا لانچ",
        prop_2_price: "1.2 کروڑ روپے",
        prop_2_h3: "ایلیٹ ہائٹس پلازہ",
        prop_2_p: "فیروز پور روڈ، لاہور",
        feat_comm: "🏙️ کمرشل",
        feat_grey: "🏗️ گرے اسٹرکچر",
        feat_area_2: "📏 5 مرلہ",
        tools_title: "پریمیئم پلاننگ ٹولز",
        tab_loan: "لون کیلکولیٹر",
        tab_inst: "اقساط کا منصوبہ",
        tab_tax: "ٹیکس تخمینہ",
        calc_result_title: "ماہانہ قسط کا تخمینہ",
        calc_rem_title: "بقیہ رقم",
        portfolio_title: "منتخب کردہ پروجیکٹس",
        port_1_h3: "گرینڈ ریزیڈنسی",
        port_1_p: "پرتعیش تعمیرات",
        port_2_h3: "ماڈرن بلڈ",
        port_2_p: "زیر تعمیر",
        port_3_h3: "ماربل پیلس",
        port_3_p: "پریمیئم فنشنگ",
        port_4_h3: "ایکوا نخلستان",
        port_4_p: "پرتعیش لائف اسٹائل",
        testimonials_title: "گاہکوں کی کہانیاں",
        test_1_text: "میاں اسٹیٹ نے ہمارا خوابوں کا گھر وقت سے 2 ماہ پہلے فراہم کر دیا۔ گرے اسٹرکچر کا معیار غیر معمولی ہے!",
        test_1_name: "شیخ سلمان",
        test_1_pos: "بزنس اونر",
        test_2_text: "لاہور میں سب سے زیادہ شفاف رئیل اسٹیٹ سروس۔ میاں اکبر نے خود پورے عمل میں ہماری رہنمائی کی۔",
        test_2_name: "علی رضا",
        test_2_pos: "انویسٹر",
        ceo_pos: "بانی اور سی ای او",
        footer_title: "رابطہ کریں",
        footer_desc: "اپنا خواب تعمیر کرنے کے لیے تیار ہیں؟ آج ہی رابطہ کریں۔",
        footer_addr: "📍 494 کمرشل بلاک ایف، پاک عرب ہاؤسنگ اسکیم، فیروز پور روڈ، لاہور",
        footer_map: "گوگل میپس پر دیکھیں",
        footer_phone1: "0322 4406590 📞",
        footer_phone2: "0300 8467938 📞",
        footer_email: "mianpakarb156c@gmail.com 📧",
        contact_name: "آپ کا نام",
        contact_email: "آپ کا ای میل",
        contact_phone: "آپ کا فون نمبر",
        contact_msg: "پیغام",
        contact_send: "پیغام بھیجیں",
        whatsapp_btn: "واٹس ایپ پر رابطہ کریں"
    }
};

let currentLang = localStorage.getItem('siteLang') || 'en';

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            // Keep inner spans for specific styling if they exist (like in Hero H1)
            if (el.querySelector('span') && currentLang === 'en') {
                const parts = translations[currentLang][key].split('Future');
                el.innerHTML = `${parts[0]}<span>Future</span>${parts[1] || ''}`;
            } else if (el.querySelector('span') && currentLang === 'ur') {
                const parts = translations[currentLang][key].split('مستقبل');
                el.innerHTML = `${parts[0]}<span>مستقبل</span>${parts[1] || ''}`;
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update Body Class & Direction
    document.body.className = `lang-${currentLang}`;
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
    document.getElementById('langToggle').textContent = currentLang === 'en' ? 'اردو' : 'English';
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    localStorage.setItem('siteLang', currentLang);
    updateContent();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateContent);

// Contact Form WhatsApp Redirect (Updated to use translated text)
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const whatsappNumber = "923224406590";
    const header = currentLang === 'ur' ? "*میاں اسٹیٹ اینڈ بلڈرز سے نئی انکوائری*" : "*New Inquiry from Mian Estate & Builders*";
    const nameLabel = currentLang === 'ur' ? "*نام:*" : "*Name:*";
    const emailLabel = currentLang === 'ur' ? "*ای میل:*" : "*Email:*";
    const phoneLabel = currentLang === 'ur' ? "*فون:*" : "*Phone:*";
    const msgLabel = currentLang === 'ur' ? "*پیغام:*" : "*Message:*";

    const text = `${header}%0A%0A${nameLabel} ${name}%0A${emailLabel} ${email}%0A${phoneLabel} ${phone}%0A${msgLabel} ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(whatsappUrl, '_blank');
});
