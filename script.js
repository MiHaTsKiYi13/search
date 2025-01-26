// Получаем элементы
const searchEngineSelect = document.querySelector('.search-engine-select')
const searchForm = document.getElementById('search-form')
const searchBar = document.querySelector('.search-bar')
const infoWindow = document.querySelector('.info-window')
const closeButton = document.querySelector('.close-button') // Кнопка для закрытия

// Список популярных сайтов для автозаполнения
const sites = {
  youtube: 'youtube.com',
  google: 'google.com',
  facebook: 'facebook.com',
  github: 'github.com',
  twitter: 'twitter.com',
  instagram: 'instagram.com',
  twitch: 'twitch.tv',
  reddit: 'reddit.com',
  stackoverflow: 'stackoverflow.com',
  wikipedia: 'wikipedia.org',
  medium: 'medium.com',
  linkedin: 'linkedin.com',
  pinterest: 'pinterest.com',
  amazon: 'amazon.com',
  ebay: 'ebay.com',
  spotify: 'spotify.com',
  netflix: 'netflix.com',
  apple: 'apple.com',
  telegram: 'web.telegram.org',
  chatgpt: 'chatgpt.com',
  tiktok: 'tiktok.com',
  discord: 'discord.com',
  zoom: 'zoom.us',
  vimeo: 'vimeo.com',
  coursera: 'coursera.org',
  udemy: 'udemy.com',
  airbnb: 'airbnb.com',
  booking: 'booking.com',
  expedia: 'expedia.com',
  dropbox: 'dropbox.com',
  weebly: 'weebly.com',
  wix: 'wix.com',
  squarespace: 'squarespace.com',
  behance: 'behance.net',
  dribbble: 'dribbble.com',
  slack: 'slack.com',
  trello: 'trello.com',
  asana: 'asana.com',
  notion: 'notion.so',
  paypal: 'paypal.com',
  stripe: 'stripe.com',
  bitbucket: 'bitbucket.org',
  digitalocean: 'digitalocean.com',
  heroku: 'heroku.com',
  cloudflare: 'cloudflare.com',
  imdb: 'imdb.com',
  soundcloud: 'soundcloud.com',
  deezer: 'deezer.com',
  kickstarter: 'kickstarter.com',
  patreon: 'patreon.com',
  tumblr: 'tumblr.com',
  quora: 'quora.com',
  flipkart: 'flipkart.com',
  aliexpress: 'aliexpress.com',
  yandex: 'yandex.com',
  vk: 'vk.com',
  odnoklassniki: 'ok.ru',
  dailymotion: 'dailymotion.com',
  roblox: 'roblox.com',
  epicgames: 'epicgames.com',
  steam: 'steampowered.com',
  gog: 'gog.com',
  humblebundle: 'humblebundle.com',
  itch: 'itch.io',
  deviantart: 'deviantart.com',
  archive: 'archive.org',
  canva: 'canva.com',
  pixabay: 'pixabay.com',
  unsplash: 'unsplash.com',
  pexels: 'pexels.com',
  shutterstock: 'shutterstock.com',
  maps: 'google.com/maps',
  drive: 'drive.google.com',
  translate: 'translate.google.com',
  copilot: 'copilot.microsoft.com'
};


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
	let query = searchBar.value.trim()

	// Если введен домен
	if (query.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
		event.preventDefault()
		const url = query.startsWith('http') ? query : `https://${query}`
		window.location.href = url // Перенаправляем на сайт
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
	updateSearchEngine() // Обновляем поисковик после изменения
})

// Всплывающая подсказка при наведении на выпадающий список
searchEngineSelect.title = `Available options:
1. Google
2. Yahoo
3. Bing
4. DuckDuckGo`

// Логика для динамической подстановки доменов
searchBar.addEventListener('input', () => {
	let query = searchBar.value.trim().toLowerCase()

	// Если введено слово без домена, подставляем .com или .org в зависимости от сайта
	if (sites[query]) {
		searchBar.value = sites[query] // Подставляем полный домен
		infoWindow.innerHTML = `Go to: <a href="https://${sites[query]}" target="_blank">https://${sites[query]}</a>`
		infoWindow.style.display = 'block'
	} else if (query.match(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
		// Если введен домен, показываем ссылку
		infoWindow.innerHTML = `Go to: <a href="https://${query}" target="_blank">https://${query}</a>`
		infoWindow.style.display = 'block'
	} else {
		infoWindow.style.display = 'none'
	}
})

// Закрытие инфо-окна
closeButton.addEventListener('click', () => {
	infoWindow.style.display = 'none'
})

// Функция для отображения уведомлений
function showNotification(message, type = 'info') {
	const notification = document.createElement('div')
	notification.classList.add('notification', type)
	notification.textContent = message
	document.body.appendChild(notification)
	setTimeout(() => notification.remove(), 5000)
}

// Функция для очистки поля поиска
function clearSearchField() {
	searchBar.value = ''
	searchBar.focus()
}

// Функция для установки фокуса на строку поиска
function focusSearchField() {
	searchBar.focus()
}

// Пример использования функции для уведомлений
showNotification('Page Loaded', 'success')
showNotification('Something went wrong!', 'error')

