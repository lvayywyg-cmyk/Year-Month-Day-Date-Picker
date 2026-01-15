// Example configuration
window.commonTranslations = {
    lang: 'en',
    datePicker: {
        modalTitle: 'Select Date',
        confirmButton: 'Confirm'
    }
};

// Example variables
let selectedDate = null;

// Initialize example
document.addEventListener('DOMContentLoaded', function() {
    // Open picker button
    const openPickerBtn = document.getElementById('open-picker-btn');
    if (openPickerBtn) {
        openPickerBtn.addEventListener('click', openPicker);
    }

    // Language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', changeLanguage);
    }
});

function openPicker() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    window.datePicker.show(
        'Select Date',
        function(result) {
            selectedDate = result;
            updateDateDisplay(result);
        },
        {
            initialYear: currentYear,
            initialMonth: currentMonth,
            initialDay: currentDay
        }
    );
}

function updateDateDisplay(result) {
    const dateResult = document.getElementById('date-result');
    if (dateResult && result) {
        const lang = window.commonTranslations.lang;
        const monthNames = getMonthNames(lang);
        const monthName = monthNames[result.month];
        dateResult.textContent = `${result.year}-${result.month + 1}-${result.day}`;
    }
}

function changeLanguage(event) {
    const lang = event.target.value;
    window.commonTranslations.lang = lang;

    // Update translations
    const translations = getLanguageTranslations(lang);
    window.commonTranslations.datePicker.modalTitle = translations.modalTitle;
    window.commonTranslations.datePicker.confirmButton = translations.confirmButton;

    // Update display if there's a selected date
    if (selectedDate) {
        updateDateDisplay(selectedDate);
    }
}

function getMonthNames(lang) {
    const monthNames = {
        'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'zh': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        'ja': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        'ko': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        'es': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        'fr': ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
        'de': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        'ar': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        'hi': ['जन', 'फर', 'मार्च', 'अप्र', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्ट', 'नव', 'दिस']
    };

    return monthNames[lang] || monthNames['en'];
}

function getLanguageTranslations(lang) {
    const translations = {
        'en': { modalTitle: 'Select Date', confirmButton: 'Confirm' },
        'zh': { modalTitle: '选择日期', confirmButton: '确认' },
        'ja': { modalTitle: '日付を選択', confirmButton: '確認' },
        'ko': { modalTitle: '날짜 선택', confirmButton: '확인' },
        'es': { modalTitle: 'Seleccionar fecha', confirmButton: 'Confirmar' },
        'fr': { modalTitle: 'Sélectionner la date', confirmButton: 'Confirmer' },
        'de': { modalTitle: 'Datum auswählen', confirmButton: 'Bestätigen' },
        'ar': { modalTitle: 'اختر التاريخ', confirmButton: 'تأكيد' },
        'hi': { modalTitle: 'तारीख चुनें', confirmButton: 'पुष्टि करें' }
    };

    return translations[lang] || translations['en'];
}
