// Получаем элементы
const searchEngineSelect = document.querySelector('.search-engine-select')
const searchForm = document.getElementById('search-form')
const searchBar = document.querySelector('.search-bar')

// Функция для обновления action и placeholder
searchEngineSelect.addEventListener('change', function () {
	const selectedEngine = this.value // Получаем выбранный поисковик
	let actionURL = ''
	let placeholderText = ''

	// Логика для изменения URL действия и текста placeholder
	switch (selectedEngine) {
		case 'google':
			actionURL = 'https://www.google.com/search'
			placeholderText = 'Search with Google'
			searchForm.innerHTML = `
                <input type="text" name="q" placeholder="${placeholderText}" class="search-bar" required>
                <button type="submit" class="search-button">Search</button>
            `
			break
		case 'yahoo':
			actionURL = 'https://search.yahoo.com/search'
			placeholderText = 'Search with Yahoo'
			searchForm.innerHTML = `
                <input type="text" name="p" placeholder="${placeholderText}" class="search-bar" required>
                <button type="submit" class="search-button">Search</button>
            `
			break
		case 'bing':
			actionURL = 'https://www.bing.com/search'
			placeholderText = 'Search with Bing'
			searchForm.innerHTML = `
                <input type="text" name="q" placeholder="${placeholderText}" class="search-bar" required>
                <button type="submit" class="search-button">Search</button>
            `
			break
		default:
			actionURL = 'https://duckduckgo.com/'
			placeholderText = 'Search with DuckDuckGo'
			searchForm.innerHTML = `
                <input type="text" name="q" placeholder="${placeholderText}" class="search-bar" required>
                <button type="submit" class="search-button">Search</button>
            `
	}

	// Устанавливаем новый action для формы
	searchForm.action = actionURL
	searchBar.placeholder = placeholderText
})


