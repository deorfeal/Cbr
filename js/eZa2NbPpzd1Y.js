// названия в $ (например, $value$) - подставляемые параметры
window.appLocalization = {
	locales: 'ru',
	file: {
		mb: 'МБ',
		kb: 'КБ',
		b: 'Б',
		maxSizeErr: 'Превышен суммарный размер файлов',
		maxCountErr: 'Превышено максимальное количество файлов',
		formatErr: 'Недопустимый формат',
		nameSizeErr: 'Имя файла не должно быть длиннее $value$ символов'
	},
	MonthPicker: {
		emptyValue: 'Месяц Год',
		separator: '.',
		plugin: {
			year: 'год',
			prevYear: 'Предыдущий год',
			nextYear: 'Следующий год',
			next12Years: 'Перейти на 12 лет вперед',
			prev12Years: 'Перейти на 12 лет назад',
			nextLabel: 'Следующий',
			prevLabel: 'Предыдущий',
			buttonText: 'Выбор месяца',
			jumpYears: 'Выбор года',
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
		}
	},
	QuarterPicker: {
		emptyValue: 'Квартал Год',
		separator: '.',
		plugin: {
			year: 'год',
			prevYear: 'Предыдущий год',
			nextYear: 'Следующий год',
			next12Years: 'Перейти на 12 лет вперед',
			prev12Years: 'Перейти на 12 лет назад',
			nextLabel: 'Следующий',
			prevLabel: 'Предыдущий',
			buttonText: 'Выбор квартала',
			jumpYears: 'Выбор года',
			quarters: ['I квартал', 'II квартал', 'III квартал', 'IV квартал']
		}
	},
	datepicker: {
		emptyValue: 'ДД.ММ.ГГГГ',
		plugin: {
			closeText: 'Закрыть',
			prevText: '&#x3C;Пред',
			nextText: 'След&#x3E;',
			currentText: 'Сегодня',
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			weekHeader: 'Нед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		}
	},
	decadepicker: {
		emptyValue: 'Декада.ММ.ГГГГ',
		plugin: {
			closeText: 'Закрыть',
			prevText: '&#x3C;Пред',
			nextText: 'След&#x3E;',
			currentText: 'Сегодня',
			decadeName: 'декада',
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
				'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
			dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			weekHeader: 'Нед',
			dateFormat: 'd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''
		}
	},
	yearpicker: {
		emptyValue: 'Год'
	},
	textarea: {
		charsLeft: 'Осталось символов:',
		extraChars: 'Введено лишних символов:'
	},
	filter: {
		selected: 'Выбрано'
	},
	subscription: {
		text: ['Выбрана $count$ тема', 'Выбрано $count$ темы', 'Выбрано $count$ тем']
	}
};
