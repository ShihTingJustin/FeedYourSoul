//刪除前再次確認
function deleteCheckAgain() {
  return window.confirm('Do you really want to delete this restaurant ?')
}

function editCheckAgain() {
  return window.confirm('Do you really want to send these information ?')
}

const pathname = window.location.pathname
if (pathname === '/search') {
  const searchBar = document.querySelector('.search-bar-outer')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    searchBar.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname.includes('/edit') || pathname.includes('/new')) {
  const container = document.querySelector('.container')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    container.scrollIntoView({ behavior: 'smooth' })
  })
}

if (pathname.includes('/restaurants')) {
  const restaurantTitle = document.querySelector('.restaurant-show-title')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    restaurantTitle.scrollIntoView({ behavior: 'smooth' })
  })
}

