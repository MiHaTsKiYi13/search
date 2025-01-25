// Получаем элементы
const searchEngineSelect = document.querySelector('.search-engine-select')
const searchForm = document.getElementById('search-form')
const searchBar = document.querySelector('.search-bar')
const infoWindow = document.querySelector('.info-window')
const closeButton = document.querySelector('.close-button') // Кнопка для закрытия

// Функция для обновления action и placeholder на основе куки
function updateSearchEngine() {
	const selectedEngine = searchEngineSelect.value
	let actionURL = ''
	let placeholderText = ''

	switch (selectedEngine) {
		case 'google':
			actionURL = 'https://www.google.com/search'
			placeholderText = 'Search with Google'
			break
		case 'yahoo':
			actionURL = 'https://search.yahoo.com/search'
			placeholderText = 'Search with Yahoo'
			break
		case 'bing':
			actionURL = 'https://www.bing.com/search'
			placeholderText = 'Search with Bing'
			break
		default:
			actionURL = 'https://duckduckgo.com/'
			placeholderText = 'Search with DuckDuckGo'
			break
	}

	// Устанавливаем новые значения для формы и поля ввода
	searchForm.action = actionURL
	searchBar.placeholder = placeholderText

	// Сохраняем выбранный поисковик в куки
	const expires = new Date()
	expires.setFullYear(expires.getFullYear() + 1)
	document.cookie = `selectedEngine=${selectedEngine}; path=/; expires=${expires.toUTCString()}; secure; SameSite=Lax`
}

// Восстановление значения из куки при загрузке страницы
window.addEventListener('load', () => {
	const cookies = document.cookie.split('; ')
	const selectedEngineCookie = cookies.find(cookie =>
		cookie.startsWith('selectedEngine=')
	)

	if (selectedEngineCookie) {
		const selectedEngine = selectedEngineCookie.split('=')[1]
		searchEngineSelect.value = selectedEngine
		updateSearchEngine()
	} else {
		updateSearchEngine() // Используем поиск по умолчанию
	}

	// Устанавливаем фокус на строку поиска при нажатии любой клавиши
	document.addEventListener('keydown', event => {
		if (event.key !== 'F') {
			searchBar.focus()
		}
	})
})

// Слушатель события изменения поисковой системы
searchEngineSelect.addEventListener('change', updateSearchEngine)

// Перехват отправки формы для проверки на домен
searchForm.addEventListener('submit', event => {
	const query = searchBar.value.trim()

	if (query.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
		event.preventDefault()
		const url = query.startsWith('http') ? query : `https://${query}`
		window.location.href = url
	} else if (!query) {
		event.preventDefault()
		alert('Please enter a search query or URL.')
	}
})

// Горячие клавиши для переключения поисковиков
document.addEventListener('keydown', event => {
	if (event.ctrlKey && event.key === '1') {
		searchEngineSelect.value = 'google'
	} else if (event.ctrlKey && event.key === '2') {
		searchEngineSelect.value = 'yahoo'
	} else if (event.ctrlKey && event.key === '3') {
		searchEngineSelect.value = 'bing'
	} else if (event.ctrlKey && event.key === '4') {
		searchEngineSelect.value = 'duckduckgo'
	}
	updateSearchEngine()
})

// Всплывающая подсказка при наведении на выпадающий список
searchEngineSelect.title = `Available options:
1. Google
2. Yahoo
3. Bing
4. DuckDuckGo`

// Функция для отображения окна
function showInfoWindow() {
	infoWindow.style.display = 'block' // Показываем окно
}

// Функция для скрытия модального окна
function closeInfoWindow() {
	infoWindow.style.display = 'none' // Скрываем окно
}



// Закрытие окна при нажатии на клавишу ESC
document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		closeInfoWindow()
	}
})

// Закрытие при нажатии на кнопку закрытия
if (closeButton) {
	closeButton.addEventListener('click', closeInfoWindow)
}

// Слушаем нажатие клавиши Tab
document.addEventListener('keydown', e => {
	if (e.key === 'Tab') {
		showInfoWindow()
		autoCloseInfoWindow()
	}
})
