// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
  const isHidden = mobileNav.classList.contains('hidden');
  mobileMenuBtn.setAttribute('aria-expanded', (!isHidden).toString());
  menuIcon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
  lucide.createIcons();
});

// Close mobile nav when clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// Scroll-triggered navbar compact state
const mainNavbar = document.getElementById('main-navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    mainNavbar.classList.add('scrolled');
  } else {
    mainNavbar.classList.remove('scrolled');
  }
}, { passive: true });

// 1. Core HMS Modules Switcher Content Database (Strictly Aligned with PDF Document)
const modulesData = {
  'tab-dashboard': {
    title: 'Dashboard Overview',
    desc: 'Provides a real-time overview of hospital operations through KPIs, revenue, patient flow and alerts.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: "Today's OPD/IPD", desc: 'Live monitoring of outpatient visits and inpatient occupancy.' },
      { name: 'Revenue', desc: 'Real-time billing, collections, and financial analytics.' },
      { name: 'Bed Occupancy', desc: 'Visual ward grid showing occupied, available, and reserved beds.' },
      { name: 'Doctor Availability', desc: 'Roster management, active consults, and shift tracking.' },
      { name: 'Analytics', desc: 'Operational performance insights and hospital KPIs.' }
    ]
  },
  'tab-registration': {
    title: 'Patient Registration',
    desc: 'Creates a unique UHID and maintains complete electronic patient records for future visits.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'UHID', desc: 'Unique Health Identifier generated for every registered patient.' },
      { name: 'Demographics', desc: 'Comprehensive personal, guardian, and emergency contact details.' },
      { name: 'Insurance', desc: 'Payer profiles, policy details, and TPA coverage mapping.' },
      { name: 'Documents', desc: 'Digital upload and storage of ID proofs, consents, and files.' },
      { name: 'History', desc: 'Complete historical timeline of visits, diagnoses, and treatments.' }
    ]
  },
  'tab-appointments': {
    title: 'Appointment Management',
    desc: 'Manages doctor schedules, online booking, walk-ins and reminders.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Booking', desc: 'Multi-channel appointment booking via web, app, or desk.' },
      { name: 'Queue', desc: 'Live patient OPD queue management and wait-time tracking.' },
      { name: 'Token', desc: 'Automated token generation for walk-ins and appointments.' },
      { name: 'Reschedule', desc: 'Flexible slot updates and doctor schedule adjustments.' },
      { name: 'Reminders', desc: 'Automated SMS/WhatsApp appointment notification alerts.' }
    ]
  },
  'tab-opd': {
    title: 'OPD Management',
    desc: 'Handles outpatient consultation, diagnosis, prescription and follow-up.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Consultation', desc: 'Doctor clinical notes, chief complaints, and examination logs.' },
      { name: 'Vitals', desc: 'Capture temperature, BP, pulse, weight, and SPO2.' },
      { name: 'Prescription', desc: 'Digital e-prescriptions with drug dosage and frequency.' },
      { name: 'Diagnosis', desc: 'ICD-10 clinical coding and diagnostic note recording.' },
      { name: 'Follow-up', desc: 'Schedule follow-up visit dates and return instructions.' }
    ]
  },
  'tab-ipd': {
    title: 'IPD Management',
    desc: 'Manages admission to discharge including beds, nursing and billing.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Admission', desc: 'Seamless inpatient admission workflow and deposit tracking.' },
      { name: 'Bed', desc: 'Ward & bed allocation, transfers, and status updates.' },
      { name: 'Rounds', desc: 'Daily doctor visit notes and treatment updates.' },
      { name: 'Nursing', desc: 'Medication administration logs and vitals charts.' },
      { name: 'Discharge', desc: 'Discharge summary generation and clearance approval.' }
    ]
  },
  'tab-pharmacy': {
    title: 'Pharmacy',
    desc: 'Controls medicine inventory, purchases and dispensing.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Purchase', desc: 'Purchase orders, vendor management, and stock inward.' },
      { name: 'Stock', desc: 'Real-time medicine inventory tracking and batch management.' },
      { name: 'Expiry', desc: 'Automated expiry date alerts and slow-moving drug tracking.' },
      { name: 'Billing', desc: 'Point-of-sale pharmacy billing synced with OPD/IPD.' },
      { name: 'Returns', desc: 'Sales returns, batch adjustments, and discard logs.' }
    ]
  },
  'tab-laboratory': {
    title: 'Laboratory',
    desc: 'Automates pathology workflow from sample collection to reports.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Tests', desc: 'Comprehensive diagnostic test master and package catalog.' },
      { name: 'Samples', desc: 'Sample collection, barcode tagging, and lab routing.' },
      { name: 'Results', desc: 'Parameter result entry with reference range indicators.' },
      { name: 'Approval', desc: 'Pathologist verification and digital signature sign-off.' },
      { name: 'Reports', desc: 'Instant PDF report generation and WhatsApp dispatch.' }
    ]
  },
  'tab-billing': {
    title: 'Billing',
    desc: 'Centralized billing for all departments with taxes and payments.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'OPD/IPD', desc: 'Unified billing for consultations, bed charges, and procedures.' },
      { name: 'Lab', desc: 'Pathology and radiology test charge aggregation.' },
      { name: 'Pharmacy', desc: 'Integrated medicine charges rolled into final invoice.' },
      { name: 'Discount', desc: 'Corporate, insurance, and concession management.' },
      { name: 'Receipts', desc: 'Multi-mode payment receipts, advances, and refunds.' }
    ]
  },
  'tab-reports': {
    title: 'Reports & Analytics',
    desc: 'Generates operational, clinical and financial reports.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Revenue', desc: 'Daily, monthly, and departmental revenue breakdown.' },
      { name: 'Patient', desc: 'Footfall, demographics, and retention reports.' },
      { name: 'Doctor', desc: 'Consultation count, OPD/IPD revenue contribution.' },
      { name: 'Inventory', desc: 'Stock valuation, fast-moving items, and reorder alerts.' },
      { name: 'Exports', desc: 'Export all reports to Excel, PDF, and CSV formats.' }
    ]
  },
  'tab-superadmin': {
    title: 'Super Admin (SaaS)',
    desc: 'Central management of multiple hospitals, subscriptions and modules.',
    benefits: 'Improves operational efficiency, reduces manual work, increases accuracy, and provides better visibility for hospital management.',
    features: [
      { name: 'Hospitals', desc: 'Multi-branch & multi-hospital tenant onboard management.' },
      { name: 'Packages', desc: 'Subscription tier configuration and feature bundling.' },
      { name: 'Permissions', desc: 'Role-based access controls (RBAC) and user rights.' },
      { name: 'Monitoring', desc: 'System health logs, audit trails, and usage metrics.' },
      { name: 'Licenses', desc: 'Software license keys, expiration, and renewal tracking.' }
    ]
  }
};

function switchModule(tabId) {
  // Toggle button highlights
  document.querySelectorAll('.module-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'border-slate-200', 'bg-white', 'shadow-sm');
    btn.classList.add('border-slate-100');
  });
  const selectedBtn = document.getElementById('btn-' + tabId);
  if (selectedBtn) {
    selectedBtn.classList.add('active', 'border-slate-200', 'bg-white', 'shadow-sm');
    selectedBtn.classList.remove('border-slate-100');
  }

  // Fetch content
  const data = modulesData[tabId];
  if (!data) return;
  const container = document.getElementById('module-display-content');

  // Build features list html
  let featuresHtml = '';
  data.features.forEach(f => {
    featuresHtml += `
      <div class="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-200">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-500/20">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
        </div>
        <div>
          <h6 class="text-xs font-bold text-slate-800">${f.name}</h6>
          <p class="text-[0.6875rem] text-slate-500 mt-0.5 leading-relaxed">${f.desc}</p>
        </div>
      </div>
    `;
  });

  // Update inner HTML of detail container
  container.innerHTML = `
    <div class="space-y-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="inline-flex items-center space-x-1 text-[0.625rem] font-bold text-brand-600 tracking-widest uppercase bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-md mb-2">
            <i data-lucide="layers" class="w-3 h-3"></i>
            <span>Module Detail</span>
          </span>
          <h3 class="text-2xl font-display font-extrabold text-slate-900">${data.title}</h3>
        </div>
        <div class="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-emerald-700">Active</span>
        </div>
      </div>

      <div class="space-y-2">
        <h6 class="text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest">Overview</h6>
        <p class="text-slate-600 text-sm leading-relaxed">${data.desc}</p>
      </div>

      <div>
        <h5 class="text-[0.625rem] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center space-x-2">
          <span class="flex-1 h-px bg-slate-100"></span>
          <span>Key Features</span>
          <span class="flex-1 h-px bg-slate-100"></span>
        </h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${featuresHtml}
        </div>
      </div>

      <div class="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-brand-50/50 border border-indigo-100">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/25">
          <i data-lucide="trending-up" class="w-5 h-5"></i>
        </div>
        <div>
          <h6 class="text-[0.625rem] font-bold text-indigo-900 uppercase tracking-wider">Business Benefits</h6>
          <p class="text-xs text-indigo-800 mt-0.5 leading-relaxed">${data.benefits}</p>
        </div>
      </div>
    </div>
  `;

  // Reinitialize Lucide icons inside dynamic container
  lucide.createIcons();
}

// 2. AI Intelligence Sandbox Simulator
const aiSimulations = {
  'ai-reminder': `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div class="flex items-center space-x-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-800">WhatsApp Patient Assistant</span>
        </div>
        <span class="text-[0.625rem] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">Confirmed</span>
      </div>
      <div class="p-4 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-2xl text-xs text-slate-700 space-y-1.5">
        <p><strong class="text-emerald-900">Hospital System:</strong> "Hi Rohit! Confirming your appointment with Dr. Gupta tomorrow at 10:00 AM. Reply 1 to confirm, 2 to reschedule."</p>
        <p><strong class="text-slate-900">Patient Response:</strong> "1 (Confirmed)"</p>
      </div>
      <p class="text-xs text-emerald-600 font-semibold flex items-center gap-1">
        <i data-lucide="check" class="w-3.5 h-3.5"></i> Appointment automatically added to doctor's schedule.
      </p>
    </div>
  `,
  'ai-discharge': `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div class="flex items-center space-x-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-800">Automated Discharge Summary</span>
        </div>
        <span class="text-[0.625rem] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">Ready for Doctor</span>
      </div>
      <div class="p-4 bg-teal-50/60 border-l-4 border-teal-500 rounded-r-2xl text-xs text-slate-700 space-y-2">
        <div class="flex justify-between items-center font-bold">
          <span>Patient: Suman Roy (Ward B-12)</span>
          <span class="text-emerald-700 font-extrabold text-[0.6875rem]">Fit for Discharge</span>
        </div>
        <p class="text-slate-600 leading-relaxed">Summary: Recovered well. Vitals are completely normal. Take-home medications and schedule successfully attached.</p>
      </div>
      <p class="text-xs text-teal-600 font-semibold flex items-center gap-1">
        <i data-lucide="file-check" class="w-3.5 h-3.5"></i> Summary compiled and sent to the billing desk to speed up exit.
      </p>
    </div>
  `,
  'ai-procedure': `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div class="flex items-center space-x-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-800">Voice Consultation Notes</span>
        </div>
        <span class="text-[0.625rem] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">Speech-to-Text</span>
      </div>
      <div class="p-4 bg-purple-50/60 border-l-4 border-purple-500 rounded-r-2xl text-xs text-slate-700 space-y-2">
        <p class="italic text-slate-500 text-xs">Doctor dictated: "Prescribe Cefuroxime 500mg, twice a day for 5 days after meals."</p>
        <div class="pt-2 border-t border-purple-100 flex items-center justify-between font-bold text-purple-900">
          <span>Cefuroxime 500mg (Morning & Night, 5 Days)</span>
          <span class="text-emerald-600 text-[0.625rem] bg-emerald-50 px-2 py-0.5 rounded-md">Auto-written</span>
        </div>
      </div>
      <p class="text-xs text-purple-600 font-semibold flex items-center gap-1">
        <i data-lucide="mic" class="w-3.5 h-3.5"></i> Notes added directly to patient's digital record.
      </p>
    </div>
  `,
  'ai-suggestions': `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-200/80">
        <div class="flex items-center space-x-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span class="text-xs font-bold text-slate-800">Drug Conflict Check</span>
        </div>
        <span class="text-[0.625rem] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">Safety Alert</span>
      </div>
      <div class="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl text-xs text-amber-900 space-y-1.5">
        <p><strong class="text-rose-600">Warning:</strong> Warfarin conflicts with Ibuprofen (increased bleeding risk).</p>
        <p><strong class="text-emerald-800">Suggested Alternative:</strong> Paracetamol 500mg.</p>
      </div>
      <p class="text-xs text-amber-700 font-semibold flex items-center gap-1">
        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Conflict safety check complete.
      </p>
    </div>
  `
};

let activeAISimulator = 'ai-reminder';

function toggleAISandbox(aiId) {
  document.querySelectorAll('.ai-tab-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-[#4f46e5]', 'text-white', 'shadow-xs');
    btn.classList.add('text-slate-600');
  });
  const selectedBtn = document.getElementById('btn-' + aiId);
  if (selectedBtn) {
    selectedBtn.classList.add('active', 'bg-[#4f46e5]', 'text-white', 'shadow-xs');
    selectedBtn.classList.remove('text-slate-600');
  }

  activeAISimulator = aiId;
  document.getElementById('ai-sandbox-output').innerHTML = aiSimulations[aiId];
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function rerunAISimulation() {
  const output = document.getElementById('ai-sandbox-output');
  output.innerHTML = '<span class="text-slate-500">// Processing secure query...</span>';
  setTimeout(() => {
    output.innerHTML = aiSimulations[activeAISimulator];
  }, 600);
}

// 3. Interactive ROI Savings Calculator logic
const opdSlider = document.getElementById('opd-slider');
const bedsSlider = document.getElementById('beds-slider');

const opdValue = document.getElementById('opd-value');
const bedsValue = document.getElementById('beds-value');

const savingsDisplay = document.getElementById('savings-display');
const hoursDisplay = document.getElementById('hours-display');

function calculateSavings() {
  const opd = parseInt(opdSlider.value);
  const beds = parseInt(bedsSlider.value);

  // Display active values
  opdValue.textContent = opd;
  bedsValue.textContent = beds + " Beds";

  // Calculate monthly savings
  const noShowSavings = opd * 30 * 2;
  const billingErrorsSavings = beds * 30 * 0.75 * 10;
  const totalSavings = noShowSavings + billingErrorsSavings;

  // Staff Hours Saved:
  const registrationHoursSaved = opd * 30 * 0.05; 
  const dischargeHoursSaved = (beds * 1.5) * 0.5;
  const totalHours = Math.round(registrationHoursSaved + dischargeHoursSaved);

  // Format displays
  savingsDisplay.textContent = "$" + totalSavings.toLocaleString('en-US');
  hoursDisplay.textContent = totalHours.toLocaleString('en-US') + " Hours";
}

opdSlider.addEventListener('input', calculateSavings);
bedsSlider.addEventListener('input', calculateSavings);

// Run initial calculation
calculateSavings();

// 4. Demo Submit Handler
function handleDemoRequest(event) {
  event.preventDefault();
  const email = document.getElementById('demo-email').value;
  const hospital = document.getElementById('demo-hospital').value;
  
  if (email && hospital) {
    document.getElementById('demo-status').classList.remove('hidden');
    event.target.reset();
    setTimeout(() => {
      document.getElementById('demo-status').classList.add('hidden');
    }, 5000);
  }
}

// 5. Creative FAQ Accordion controller
function toggleFaq(button) {
  const faqItem = button.closest('.faq-item');
  const answer = faqItem.querySelector('.faq-answer');
  const icon = button.querySelector('[data-lucide="chevron-down"]');
  const isOpen = faqItem.classList.contains('active');

  // Close all other FAQs for single expansion behaviour
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active', 'border-brand-300', 'shadow-md');
    item.querySelector('.faq-answer').style.maxHeight = '0px';
    const otherIcon = item.querySelector('[data-lucide="chevron-down"]');
    if (otherIcon) {
      otherIcon.style.transform = 'rotate(0deg)';
    }
  });

  if (!isOpen) {
    faqItem.classList.add('active', 'border-brand-300', 'shadow-md');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  }
}

// Pre-open first FAQ item on load
window.addEventListener('DOMContentLoaded', () => {
  const firstFaqBtn = document.querySelector('.faq-item button');
  if (firstFaqBtn) {
    setTimeout(() => {
      firstFaqBtn.click();
    }, 150);
  }
});

// Initialize Swiper Slider for AI Suite Cards (1 slide on mobile, 4 on desktop)
const initApp = () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.ai-cards-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });

    // Initialize Swiper Slider for Workflow Step Cards
    new Swiper('.workflow-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.workflow-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.workflow-next',
        prevEl: '.workflow-prev',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });

    // Initialize Swiper Slider for Hospital Testimonials
    if (document.querySelector('.testimonials-swiper')) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.testimonials-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.testimonial-next',
          prevEl: '.testimonial-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 28,
          },
        },
      });
    }

    // Odometer scroll-triggered counting logic for HMS Impact section
    const odometers = document.querySelectorAll('.impact-odometer');
    if (odometers.length > 0) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const targetStr = target.getAttribute('data-target');
            const endVal = parseFloat(targetStr);
            const duration = 1500;
            const startTime = performance.now();
            const hasDecimal = targetStr.includes('.');

            // Set dynamic wave --value variable on scroll to trigger CSS transition
            const card = target.closest('.group');
            if (card) {
              const waveMover = card.querySelector('.wave-mover');
              if (waveMover) {
                waveMover.style.setProperty('--value', targetStr + '%');
              }
            }

            function updateCount(timestamp) {
              const progress = Math.min((timestamp - startTime) / duration, 1);
              let currentVal = progress * endVal;
              if (hasDecimal) {
                target.textContent = currentVal.toFixed(1);
              } else {
                target.textContent = Math.floor(currentVal);
              }
              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                target.textContent = targetStr;
              }
            }
            requestAnimationFrame(updateCount);
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.05 });

      odometers.forEach(od => observer.observe(od));
    }
  }
};

if (document.readyState !== 'loading') {
  initApp();
} else {
  document.addEventListener('DOMContentLoaded', initApp);
}
