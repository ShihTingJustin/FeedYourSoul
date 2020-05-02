const pathname = window.location.pathname

if (pathname === '/search') {
  const searchBar = document.querySelector('.search-bar-outer')
  window.addEventListener('load', () => {
    //圖片載入完成才執行滑動
    searchBar.scrollIntoView({ behavior: 'smooth' })
  })
}
