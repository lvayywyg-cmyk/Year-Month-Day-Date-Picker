/**
 * Date Picker Component
 * A lightweight date picker modal (year, month, day)
 */
class DatePicker {
    constructor() {
        this.modal = null;
        this.isVisible = false;
        this.onDateSelect = null;
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.currentDay = new Date().getDate();
        this.modalId = 'date-picker-' + Date.now();
    }

    /**
     * Show date picker modal
     * @param {string} title - Modal title
     * @param {Function} onSelect - Selection callback function, parameters: {year, month, day}
     * @param {Object} options - Configuration options
     * @param {number} options.initialYear - Initial year
     * @param {number} options.initialMonth - Initial month (0-11)
     * @param {number} options.initialDay - Initial day (1-31)
     */
    show(title, onSelect, options = {}) {
        this.onDateSelect = onSelect;
        const now = new Date();
        this.currentYear = options.initialYear || now.getFullYear();
        this.currentMonth = options.initialMonth !== undefined ? options.initialMonth : now.getMonth();
        this.currentDay = options.initialDay || now.getDate();

        const maxYear = now.getFullYear();
        const minYear = maxYear - 12;

        if (this.modal) {
            this.modal.remove();
        }

        const langCode = window.commonTranslations?.lang || 'en';
        const modalTitle = window.commonTranslations?.datePicker?.modalTitle || title || 'Select Date';
        const confirmText = window.commonTranslations?.datePicker?.confirmButton || 'Confirm';

        const html = `
            <div id="${this.modalId}" class="generic-modal show" style="display: flex;">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${modalTitle}</h3>
                        <button class="modal-confirm" id="${this.modalId}-confirm">${confirmText}</button>
                    </div>
                    <div class="modal-body">
                        <div class="picker-columns">
                            ${this.generatePickerColumns(minYear, maxYear)}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        this.modal = document.getElementById(this.modalId);

        this.bindEvents();
        this.isVisible = true;
        this.initScrollPositions();
    }

    /**
     * Generate picker columns based on language
     */
    generatePickerColumns(minYear, maxYear) {
        const langCode = window.commonTranslations?.lang || 'en';
        const currentLang = window.commonTranslations?.lang || 'en';

        if (window.dateFormatter) {
            const formatted = window.dateFormatter.formatYearMonth(2025, 0, currentLang);
        }

        const isYearFirst = (langCode.startsWith('zh') || langCode === 'cn' ||
                            langCode.startsWith('ja') || langCode.startsWith('ko'));

        if (isYearFirst) {
            return `
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-year-wheel">
                            ${this.generateYearOptions(minYear, maxYear)}
                        </div>
                    </div>
                </div>
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-month-wheel">
                            ${this.generateMonthOptions()}
                        </div>
                    </div>
                </div>
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-day-wheel">
                            ${this.generateDayOptions()}
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-day-wheel">
                            ${this.generateDayOptions()}
                        </div>
                    </div>
                </div>
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-month-wheel">
                            ${this.generateMonthOptions()}
                        </div>
                    </div>
                </div>
                <div class="picker-column">
                    <div class="picker-wheel-container">
                        <div class="picker-wheel-mask"></div>
                        <div class="picker-wheel" id="${this.modalId}-year-wheel">
                            ${this.generateYearOptions(minYear, maxYear)}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Generate day options
     */
    generateDayOptions() {
        const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days.map(day => {
            const isSelected = day === this.currentDay;
            return `
                <div class="picker-wheel-item ${isSelected ? 'selected' : ''}" data-day="${day}">
                    <span class="item-text">${day}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Get days in a specific month
     */
    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Generate month options
     */
    generateMonthOptions() {
        const langCode = window.commonTranslations?.lang || 'en';
        const monthData = this.getMonthNames(langCode);

        return monthData.map((name, index) => {
            const isSelected = index === this.currentMonth;
            return `
                <div class="picker-wheel-item ${isSelected ? 'selected' : ''}" data-month="${index}">
                    <span class="item-text">${name}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Generate year options
     */
    generateYearOptions(minYear, maxYear) {
        const years = [];
        for (let year = maxYear; year >= minYear; year--) {
            years.push(year);
        }

        return years.map(year => {
            const isSelected = year === this.currentYear;
            return `
                <div class="picker-wheel-item ${isSelected ? 'selected' : ''}" data-year="${year}">
                    <span class="item-text">${year}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Get month names for the specified language
     */
    getMonthNames(langCode) {
        if (window.dateFormatter) {
            const monthNames = [];
            for (let i = 0; i < 12; i++) {
                const formatted = window.dateFormatter.formatYearMonth(2000, i, langCode);
                monthNames.push(this.extractMonthName(formatted, langCode));
            }
            return monthNames;
        }

        return ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
    }

    /**
     * Extract month name from formatted year-month string
     */
    extractMonthName(formatted, langCode) {
        if (langCode.startsWith('zh') || langCode === 'cn' || langCode.startsWith('ja')) {
            return formatted.replace(/2000年/, '');
        } else if (langCode.startsWith('ko')) {
            return formatted.replace(/2000년 /, '');
        } else {
            const parts = formatted.split(' ');
            return parts[0];
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        const confirmBtn = document.getElementById(`${this.modalId}-confirm`);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.confirm());
        }

        const overlay = this.modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.hideWithoutConfirm();
            });
        }

        const monthOptions = this.modal.querySelectorAll('[data-month]');
        monthOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectMonth(parseInt(option.dataset.month), false);
            });
        });

        const yearOptions = this.modal.querySelectorAll('[data-year]');
        yearOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectYear(parseInt(option.dataset.year), false);
            });
        });

        const dayOptions = this.modal.querySelectorAll('[data-day]');
        dayOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.selectDay(parseInt(option.dataset.day), false);
            });
        });

        this.initWheelInteraction();
    }

    /**
     * Initialize wheel interaction
     */
    initWheelInteraction() {
        const monthWheel = document.getElementById(`${this.modalId}-month-wheel`);
        const yearWheel = document.getElementById(`${this.modalId}-year-wheel`);
        const dayWheel = document.getElementById(`${this.modalId}-day-wheel`);

        if (monthWheel) {
            this.setupWheelScroll(monthWheel, 'month');
        }

        if (yearWheel) {
            this.setupWheelScroll(yearWheel, 'year');
        }

        if (dayWheel) {
            this.setupWheelScroll(dayWheel, 'day');
        }
    }

    /**
     * Setup wheel scrolling
     */
    setupWheelScroll(wheel, type) {
        const itemHeight = 56;
        let isTouching = false;
        let scrollTimer = null;
        let startY = 0;
        let currentScrollTop = 0;
        let lastY = 0;
        let velocity = 0;
        let lastTimestamp = 0;
        let animationFrameId = null;

        wheel.addEventListener('touchstart', (e) => {
            isTouching = true;
            startY = e.touches[0].clientY;
            lastY = startY;
            currentScrollTop = wheel.scrollTop;
            velocity = 0;
            lastTimestamp = performance.now();
            if (scrollTimer) clearTimeout(scrollTimer);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }, { passive: true });

        wheel.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            e.preventDefault();

            const currentY = e.touches[0].clientY;
            const deltaY = lastY - currentY;
            const currentTimestamp = performance.now();
            const deltaTime = currentTimestamp - lastTimestamp;

            if (deltaTime > 0) {
                velocity = deltaY / deltaTime;
            }

            currentScrollTop += deltaY;
            wheel.scrollTop = currentScrollTop;

            this.updateWheelSelection(wheel, type);
            this.updateCurrentSelection(wheel, type, itemHeight);

            lastY = currentY;
            lastTimestamp = currentTimestamp;
        }, { passive: false });

        wheel.addEventListener('touchend', () => {
            isTouching = false;

            if (scrollTimer) clearTimeout(scrollTimer);

            if (Math.abs(velocity) > 0.3) {
                this.applyInertiaScroll(wheel, type, itemHeight, velocity);
            } else {
                scrollTimer = setTimeout(() => {
                    this.snapToItem(wheel, type, itemHeight);
                }, 150);
            }
        }, { passive: true });

        wheel.addEventListener('wheel', (e) => {
            e.preventDefault();

            const scrollMultiplier = 2.5;
            wheel.scrollTop += e.deltaY * scrollMultiplier;
            this.updateWheelSelection(wheel, type);
            this.updateCurrentSelection(wheel, type, itemHeight);

            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.snapToItem(wheel, type, itemHeight);
            }, 150);
        }, { passive: false });

        wheel.addEventListener('scroll', () => {
            if (!isTouching) {
                this.updateWheelSelection(wheel, type);
                this.updateCurrentSelection(wheel, type, itemHeight);

                if (scrollTimer) clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    this.snapToItem(wheel, type, itemHeight);
                }, 150);
            }
        });
    }

    /**
     * Apply inertia scroll
     */
    applyInertiaScroll(wheel, type, itemHeight, initialVelocity) {
        let velocity = initialVelocity;
        const friction = 0.95;
        const minVelocity = 0.1;
        let animationFrameId = null;

        const animate = () => {
            wheel.scrollTop += velocity * 16;

            this.updateWheelSelection(wheel, type);
            this.updateCurrentSelection(wheel, type, itemHeight);

            velocity *= friction;

            if (Math.abs(velocity) > minVelocity) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                this.snapToItem(wheel, type, itemHeight);
            }
        };

        animate();
    }

    /**
     * Snap to nearest item
     */
    snapToItem(wheel, type, itemHeight) {
        const scrollTop = wheel.scrollTop;
        const remainder = scrollTop % itemHeight;
        let targetScrollTop;

        if (remainder > itemHeight / 2) {
            targetScrollTop = scrollTop + (itemHeight - remainder);
        } else {
            targetScrollTop = scrollTop - remainder;
        }

        this.animateScrollTo(wheel, targetScrollTop, () => {
            const selectedIndex = Math.round(wheel.scrollTop / itemHeight);
            this.selectByIndex(selectedIndex, type, false);
        });
    }

    /**
     * Animate scroll to target position
     */
    animateScrollTo(wheel, targetScrollTop, callback) {
        const currentScrollTop = wheel.scrollTop;
        const steps = 20;
        const stepSize = (targetScrollTop - currentScrollTop) / steps;
        let currentStep = 0;

        const animate = () => {
            currentStep++;
            wheel.scrollTop = wheel.scrollTop + stepSize;

            if (wheel.scrollTop !== targetScrollTop && currentStep < steps) {
                setTimeout(animate, 10);
            } else {
                wheel.scrollTop = targetScrollTop;
                if (callback) callback();
            }
        };

        animate();
    }

    /**
     * Select by index
     */
    selectByIndex(index, type, autoConfirm = false) {
        if (type === 'month') {
            const items = this.modal.querySelectorAll('[data-month]');
            if (items[index]) {
                this.selectMonth(parseInt(items[index].dataset.month), autoConfirm);
            }
        } else if (type === 'day') {
            const items = this.modal.querySelectorAll('[data-day]');
            if (items[index]) {
                this.selectDay(parseInt(items[index].dataset.day), autoConfirm);
            }
        } else {
            const items = this.modal.querySelectorAll('[data-year]');
            if (items[index]) {
                this.selectYear(parseInt(items[index].dataset.year), autoConfirm);
            }
        }
    }

    /**
     * Update wheel selection visual effects
     */
    updateWheelSelection(wheel, type) {
        const items = wheel.querySelectorAll('.picker-wheel-item');
        const itemHeight = 56;
        const scrollTop = wheel.scrollTop;
        const selectedIndex = Math.round(scrollTop / itemHeight);

        items.forEach((item, index) => {
            const distance = Math.abs(index - selectedIndex);
            let opacity = 1;
            let scale = 1;

            if (distance === 0) {
                opacity = 1;
                scale = 1;
            } else if (distance === 1) {
                opacity = 0.6;
                scale = 0.9;
            } else if (distance === 2) {
                opacity = 0.3;
                scale = 0.8;
            } else {
                opacity = 0.1;
                scale = 0.7;
            }

            item.style.opacity = opacity;
            item.style.transform = `scale(${scale})`;
        });
    }

    /**
     * Update current selection in real-time
     */
    updateCurrentSelection(wheel, type, itemHeight) {
        const scrollTop = wheel.scrollTop;
        const selectedIndex = Math.round(scrollTop / itemHeight);

        if (type === 'month') {
            const items = wheel.querySelectorAll('[data-month]');
            if (items[selectedIndex]) {
                this.currentMonth = parseInt(items[selectedIndex].dataset.month);
                this.updateMonthVisualSelection();
            }
        } else if (type === 'day') {
            const items = wheel.querySelectorAll('[data-day]');
            if (items[selectedIndex]) {
                this.currentDay = parseInt(items[selectedIndex].dataset.day);
                this.updateDayVisualSelection();
            }
        } else {
            const items = wheel.querySelectorAll('[data-year]');
            if (items[selectedIndex]) {
                this.currentYear = parseInt(items[selectedIndex].dataset.year);
                this.updateYearVisualSelection();
            }
        }
    }

    /**
     * Update month visual selection
     */
    updateMonthVisualSelection() {
        const monthOptions = this.modal.querySelectorAll('[data-month]');
        monthOptions.forEach(option => {
            const month = parseInt(option.dataset.month);
            const isSelected = month === this.currentMonth;
            option.classList.toggle('selected', isSelected);
        });
    }

    /**
     * Update year visual selection
     */
    updateYearVisualSelection() {
        const yearOptions = this.modal.querySelectorAll('[data-year]');
        yearOptions.forEach(option => {
            const year = parseInt(option.dataset.year);
            const isSelected = year === this.currentYear;
            option.classList.toggle('selected', isSelected);
        });
    }

    /**
     * Update day visual selection
     */
    updateDayVisualSelection() {
        const dayOptions = this.modal.querySelectorAll('[data-day]');
        dayOptions.forEach(option => {
            const day = parseInt(option.dataset.day);
            const isSelected = day === this.currentDay;
            option.classList.toggle('selected', isSelected);
        });
    }

    /**
     * Select month
     */
    selectMonth(month, autoConfirm = false) {
        this.currentMonth = month;
        this.updateMonthSelection();
        if (autoConfirm) {
            this.confirm();
        }
    }

    /**
     * Select year
     */
    selectYear(year, autoConfirm = false) {
        this.currentYear = year;
        this.updateYearSelection();
        this.updateDayOptions();
        if (autoConfirm) {
            this.confirm();
        }
    }

    /**
     * Select day
     */
    selectDay(day, autoConfirm = false) {
        this.currentDay = day;
        this.updateDaySelection();
        if (autoConfirm) {
            this.confirm();
        }
    }

    /**
     * Update month selection state
     */
    updateMonthSelection() {
        this.updateMonthVisualSelection();

        const monthWheel = document.getElementById(`${this.modalId}-month-wheel`);
        if (monthWheel) {
            const selectedOption = monthWheel.querySelector(`[data-month="${this.currentMonth}"]`);
            if (selectedOption) {
                const index = Array.from(monthWheel.children).indexOf(selectedOption);
                monthWheel.scrollTo({
                    top: index * 56,
                    behavior: 'smooth'
                });
            }
        }
    }

    /**
     * Update year selection state
     */
    updateYearSelection() {
        this.updateYearVisualSelection();

        const yearWheel = document.getElementById(`${this.modalId}-year-wheel`);
        if (yearWheel) {
            const selectedOption = yearWheel.querySelector(`[data-year="${this.currentYear}"]`);
            if (selectedOption) {
                const index = Array.from(yearWheel.children).indexOf(selectedOption);
                yearWheel.scrollTo({
                    top: index * 56,
                    behavior: 'smooth'
                });
            }
        }
    }

    /**
     * Update day selection state
     */
    updateDaySelection() {
        this.updateDayVisualSelection();

        const dayWheel = document.getElementById(`${this.modalId}-day-wheel`);
        if (dayWheel) {
            const selectedOption = dayWheel.querySelector(`[data-day="${this.currentDay}"]`);
            if (selectedOption) {
                const index = Array.from(dayWheel.children).indexOf(selectedOption);
                dayWheel.scrollTo({
                    top: index * 56,
                    behavior: 'smooth'
                });
            }
        }
    }

    /**
     * Update day options when month changes
     */
    updateDayOptions() {
        const dayWheel = document.getElementById(`${this.modalId}-day-wheel`);
        if (dayWheel) {
            const scrollTop = dayWheel.scrollTop;
            const newDaysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
            const currentDays = dayWheel.children.length;

            if (newDaysInMonth !== currentDays) {
                const selectedIndex = Math.round(scrollTop / 56);
                const selectedDay = Math.min(this.currentDay, newDaysInMonth);

                const dayOptionsHTML = this.generateDayOptions();
                dayWheel.innerHTML = dayOptionsHTML;

                this.currentDay = selectedDay;
                dayWheel.scrollTo({
                    top: (selectedDay - 1) * 56,
                    behavior: 'auto'
                });
                this.updateWheelSelection(dayWheel, 'day');
                this.updateDayVisualSelection();
            }
        }
    }

    /**
     * Initialize scroll positions
     */
    initScrollPositions() {
        const monthWheel = document.getElementById(`${this.modalId}-month-wheel`);
        const yearWheel = document.getElementById(`${this.modalId}-year-wheel`);
        const dayWheel = document.getElementById(`${this.modalId}-day-wheel`);

        if (monthWheel) {
            const selectedMonthIndex = this.currentMonth;
            monthWheel.scrollTo({
                top: selectedMonthIndex * 56,
                behavior: 'auto'
            });
            this.updateWheelSelection(monthWheel, 'month');
        }

        if (yearWheel) {
            const selectedYear = yearWheel.querySelector(`[data-year="${this.currentYear}"]`);
            if (selectedYear) {
                const index = Array.from(yearWheel.children).indexOf(selectedYear);
                yearWheel.scrollTo({
                    top: index * 56,
                    behavior: 'auto'
                });
                this.updateWheelSelection(yearWheel, 'year');
            }
        }

        if (dayWheel) {
            const selectedDayIndex = this.currentDay - 1;
            dayWheel.scrollTo({
                top: selectedDayIndex * 56,
                behavior: 'auto'
            });
            this.updateWheelSelection(dayWheel, 'day');
        }
    }

    /**
     * Confirm selection
     */
    confirm() {
        if (this.onDateSelect) {
            this.onDateSelect({
                year: this.currentYear,
                month: this.currentMonth,
                day: this.currentDay
            });
        }
        this.hide();
    }

    /**
     * Hide modal
     */
    hide() {
        if (this.modal) {
            this.modal.classList.add('closing');
            setTimeout(() => {
                if (this.modal) {
                    this.modal.remove();
                    this.modal = null;
                }
            }, 300);
        }
        this.isVisible = false;
    }

    /**
     * Hide modal without confirmation
     */
    hideWithoutConfirm() {
        if (this.modal) {
            this.modal.classList.add('closing');
            setTimeout(() => {
                if (this.modal) {
                    this.modal.remove();
                    this.modal = null;
                }
            }, 300);
        }
        this.isVisible = false;
    }
}

window.datePicker = new DatePicker();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatePicker;
}
