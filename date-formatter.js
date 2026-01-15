/**
 * Date Formatter Utility
 * Multi-language date formatting support
 */
class DateFormatter {
    /**
     * Format date based on language code
     * @param {Date} date - Date object
     * @param {string} langCode - Language code (e.g., 'en', 'zh-CN', 'ja')
     * @returns {string} Formatted date string
     */
    formatDate(date, langCode = 'en') {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const dateFormats = {
            'en': () => `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            'en-US': () => `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            'en-GB': () => `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`,
            'zh': () => `${year}年${month}月${day}日`,
            'zh-CN': () => `${year}年${month}月${day}日`,
            'zh-tw': () => `${year}年${month}月${day}日`,
            'cn': () => `${year}年${month}月${day}日`,
            'ja': () => `${year}年${month}月${day}日`,
            'ja-JP': () => `${year}年${month}月${day}日`,
            'ko': () => `${year}년 ${month}월 ${day}일`,
            'ko-KR': () => `${year}년 ${month}월 ${day}일`,
            'es': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'es-ES': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'es-MX': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'fr': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'fr-FR': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'de': () => `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`,
            'de-DE': () => `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`,
            'ar': () => `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`,
            'ar-SA': () => `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`,
            'hi': () => `${day}/${month}/${year}`,
            'hi-IN': () => `${day}/${month}/${year}`,
            'it': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'it-IT': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'pt': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'pt-BR': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'pt-PT': () => `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            'ru': () => `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`,
            'ru-RU': () => `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`,
        };

        const formatFunction = dateFormats[langCode] || dateFormats['en'];
        return formatFunction();
    }

    /**
     * Format year and month (for display)
     * @param {number} year - Year
     * @param {number} month - Month (0-11)
     * @param {string} langCode - Language code
     * @returns {string} Formatted year-month string
     */
    formatYearMonth(year, month, langCode = 'en') {
        const monthNames = {
            'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'en-GB': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            'zh': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'zh-CN': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'zh-tw': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'cn': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'ja': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'ja-JP': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            'ko': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            'ko-KR': ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            'es': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            'es-ES': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            'es-MX': ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            'fr': ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
            'fr-FR': ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
            'de': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            'de-DE': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            'ar': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            'ar-SA': ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            'hi': ['जन', 'फर', 'मार्च', 'अप्र', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्ट', 'नव', 'दिस'],
            'hi-IN': ['जन', 'फर', 'मार्च', 'अप्र', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्ट', 'नव', 'दिस'],
            'it': ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
            'it-IT': ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
            'pt': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            'pt-BR': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            'pt-PT': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
            'ru': ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
            'ru-RU': ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        };

        const languageMonths = monthNames[langCode] || monthNames['en'];
        const monthName = languageMonths[month];

        if (langCode.startsWith('zh') || langCode === 'cn') {
            return `${year}年${monthName}`;
        } else if (langCode.startsWith('ja')) {
            return `${year}年${monthName}`;
        } else if (langCode.startsWith('ko')) {
            return `${year}년 ${monthName}`;
        } else if (langCode.startsWith('ar')) {
            return `${monthName} ${year}`;
        } else if (langCode.startsWith('hi')) {
            return `${monthName} ${year}`;
        } else {
            return `${monthName} ${year}`;
        }
    }
}

window.dateFormatter = new DateFormatter();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateFormatter;
}
