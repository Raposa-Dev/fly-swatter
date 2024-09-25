if (window.innerWidth <= 768) {
    const mobileScript = document.createElement('script');
    mobileScript.src = './mobile.js'; 
    document.body.appendChild(mobileScript);
} else {
    // Caso contrário, carrega a versão para desktop
    const desktopScript = document.createElement('script');
    desktopScript.src = './desktop.js';  
    document.body.appendChild(desktopScript);
}