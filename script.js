window.addEventListener('load', () => {
    // Verifica se já foi recarregado uma vez para evitar loop infinito
    if (!sessionStorage.getItem('pageReloaded')) {
      sessionStorage.setItem('pageReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('pageReloaded'); // limpa para recarregamentos futuros
    }
  });

  let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); 
  deferredPrompt = e; // Salva o evento para usar depois
  installBtn.style.display = 'flex'; 
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
