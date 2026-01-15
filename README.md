# Revised Documentation with Additional Project Context
<img width="662" height="1436" alt="image" src="https://github.com/user-attachments/assets/331d51c0-9bfd-4176-bbc2-9b6924fc39be" />

## Year Month Day Date Picker

A lightweight, customizable year, month, and day picker component for web applications.

### Project Background
This date picker component was originally developed for my **Sudoku100** project — a free, online sudoku game platform for sudoku enthusiasts of all skill levels. If you're interested in sudoku or looking for a fun online puzzle game, feel free to check it out at: https://www.sudoku100.com

## Usage

### Basic Example

```javascript
// Open the picker
window.datePicker.show(
    'Select Date',  // Title
    function(result) {
        console.log('Year:', result.year);
        console.log('Month:', result.month + 1);
        console.log('Day:', result.day);
    },
    {
        initialYear: new Date().getFullYear(),
        initialMonth: new Date().getMonth(),
        initialDay: new Date().getDate()
    }
);
```

### With Custom Language

```javascript
// Set language before showing the picker
window.commonTranslations = {
    lang: 'zh',  // Chinese
    datePicker: {
        modalTitle: '选择日期',
        confirmButton: '确认'
    }
};

// Open the picker
window.datePicker.show(
    '选择日期',
    function(result) {
        console.log('Selected:', result.year, result.month + 1, result.day);
    }
);
```

## API

### `show(title, onSelect, options)`

Shows the date picker modal.

**Parameters:**

- `title` (string) - Modal title
- `onSelect` (function) - Callback function called when user confirms selection
  - Receives object with `year`, `month` (0-11), and `day` properties
- `options` (object, optional) - Configuration options
  - `initialYear` (number) - Initial year (default: current year)
  - `initialMonth` (number) - Initial month 0-11 (default: current month)
  - `initialDay` (number) - Initial day (default: current day)

**Example:**

```javascript
window.datePicker.show(
    'Pick a Date',
    ({ year, month, day }) => {
        alert(`Selected: ${year}-${month + 1}-${day}`);
    },
    {
        initialYear: 2025,
        initialMonth: 0,  // January
        initialDay: 15
    }
);
```

## Supported Languages

- English (en)
- Chinese (zh)
- Japanese (ja)
- Korean (ko)
- Spanish (es)
- French (fr)
- German (de)
- Arabic (ar)
- Hindi (hi)

## Customization

### Styling

The component uses CSS classes that you can override:

```css
/* Customize modal colors */
.modal-confirm {
    background: #your-color;
}

/* Customize selected item */
.picker-wheel-item.selected .item-text {
    color: #your-color;
    font-size: 22px;
}

/* Customize item size */
.picker-wheel-item {
    height: 60px; /* Default: 56px */
}
```

### Adding More Languages

To add support for additional languages, modify the `monthNames` object in both `date-formatter.js` and `date-picker.js`:

```javascript
const monthNames = {
    'your-lang': ['Month1', 'Month2', ...],
    // ...
};
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use in your projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
