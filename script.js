/* script.js - External JavaScript for ratbi-emirates.com */
document.addEventListener('DOMContentLoaded', function() {
    // Navigation logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // End of Service Calculator Logic (Example)
    const eosForm = document.getElementById('eosForm');
    if (eosForm) {
        eosForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const salary = parseFloat(document.getElementById('basicSalary').value);
            const years = parseFloat(document.getElementById('years').value);
            const months = parseFloat(document.getElementById('months').value) || 0;
            
            if (isNaN(salary) || isNaN(years)) {
                alert('يرجى إدخال الراتب وسنوات الخدمة');
                return;
            }

            const totalYears = years + (months / 12);
            let bonus = 0;

            if (totalYears < 1) {
                bonus = 0;
            } else if (totalYears <= 5) {
                bonus = (salary / 30) * 21 * totalYears;
            } else {
                bonus = ((salary / 30) * 21 * 5) + ((salary / 30) * 30 * (totalYears - 5));
            }

            // Limit to 2 years salary max as per law
            const maxBonus = salary * 24;
            bonus = Math.min(bonus, maxBonus);

            document.getElementById('totalAmount').innerText = Math.round(bonus).toLocaleString() + ' درهم';
            document.getElementById('resultBox').classList.remove('hidden');
            
            // Log for SEO/Analytics
            console.log('Calculation performed:', { salary, totalYears, bonus });
        });
    }
});
