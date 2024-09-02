document.addEventListener('dblclick', (event: MouseEvent) => {
  const target = event.target as HTMLElement

  if (target.tagName === 'INPUT' && target.getAttribute('type') === 'password') {
    const password = target as HTMLInputElement
    password.setAttribute('type', 'text')

    setTimeout(() => {
      password.setAttribute('type', 'password')
    }, 5000)
  }
})