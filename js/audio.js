// audio.js
window.onload = function() {
    var audio = document.getElementById('background-audio');
    
    // Configurar volumen
    audio.volume = 0.1;  // Ajusta el volumen (0.0 a 1.0)

    // Verificar si el audio debe estar en pausa o reproducción
    if (localStorage.getItem('audioPaused') === 'false') {
        audio.play();  // Reproducir si estaba en reproducción
    } else {
        audio.pause();  // Pausar si estaba en pausa
    }

    // Guardar el estado del audio antes de cambiar de página
    window.onbeforeunload = function() {
        if (audio.paused) {
            localStorage.setItem('audioPaused', 'true');  // Guardamos como pausado
        } else {
            localStorage.setItem('audioPaused', 'false');  // Guardamos como en reproducción
        }
    };
};
