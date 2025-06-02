if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('✅ Service Worker registrado:', reg.scope);
      reg.update(); // Atualiza imediatamente
    })
    .catch(err => console.error('❌ Falha ao registrar SW:', err));
}
    let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Escuta o evento de instalação disponível
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Impede o prompt automático
  deferredPrompt = e; // Salva o evento para usar depois
  installBtn.style.display = 'flex'; // Mostra o botão
});

// Quando o usuário clicar no botão
installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Mostra o prompt de instalação
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalar o app');
    } else {
      console.log('Usuário recusou instalar o app');
    }
    deferredPrompt = null; // Limpa o evento
    installBtn.style.display = 'none'; // Esconde o botão após uso
  }
});
