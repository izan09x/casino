const slotPics = [
    "images/cherry.png", 
    "images/grapes.png", 
    "images/heart.png", 
    "images/lemon.png", 
    "images/orange.png", 
    "images/seven.png", 
    "images/strawberry.png"
];

let balance = 50;
let betAmount = 1;

$(document).ready(function () {
    // Mostrar balance y apuesta iniciales
    updateBalance();
    updateBet();

    // Aumentar la apuesta
    $("#plus").click(function () {
        betAmount++;
        updateBet();
    });

    // Disminuir la apuesta
    $("#minus").click(function () {
        if (betAmount > 1) {
            betAmount--;
            updateBet();
        } else {
            showStatus("You cannot bet zero!", "danger");
        }
    });

    // Botón de giro de tragamonedas
    $("#betbutton").click(function () {
        if (balance === 0) {
            showStatus("You lost all your money!", "danger");
        } else if (balance - betAmount < 0) {
            showStatus(`Invalid bet amount, you do not have enough money to bet $${betAmount}`, "danger");
        } else {
            spinSlots();
        }
    });

    // Actualizar el balance mostrado en la UI
    function updateBalance() {
        $("#balance").text(balance);
    }

    // Actualizar la apuesta mostrada en la UI
    function updateBet() {
        $("#bet").text(betAmount);
    }

    // Mostrar mensajes en el estado
    function showStatus(message, type = "info") {
        $("#status")
            .removeClass("text-danger text-success")
            .addClass(type === "danger" ? "danger" : "success")
            .text(message)
            .fadeIn(300)
            .fadeOut(2000);
    }

    // Hacer girar las tragamonedas
    function spinSlots() {
        disableControls(); // Deshabilitar controles mientras se realiza el giro

        let spinPromises = [
            spinSlot("#slot1"),
            spinSlot("#slot2"),
            spinSlot("#slot3")
        ];

        // Después de que todos los slots hayan terminado de girar
        Promise.all(spinPromises).then(() => {
            checkWin(); // Comprobar si hay una victoria
            enableControls(); // Habilitar controles de nuevo
        });
    }

    // Animación del giro de un slot
    function spinSlot(slotId) {
        return new Promise(resolve => {
            let totalSpins = 30;  // Número total de giros
            let currentSpin = 0;

            $(slotId).addClass("spinner"); // Aplicar animación de giro

            let interval = setInterval(() => {
                let randomNum = Math.floor(Math.random() * slotPics.length);
                $(slotId).attr("src", slotPics[randomNum]);
                currentSpin++;

                // Detener la animación después de los giros
                if (currentSpin === totalSpins) {
                    clearInterval(interval);
                    $(slotId).removeClass("spinner"); // Remover animación de giro
                    resolve();  // Resolver la promesa cuando el giro termine
                }
            }, 100);  // Ajusta el tiempo de la animación para mayor o menor rapidez
        });
    }

    // Verificar si se ha ganado
    function checkWin() {
        if ($("#slot1").attr("src") === $("#slot2").attr("src") && $("#slot1").attr("src") === $("#slot3").attr("src")) {
            balance += betAmount * 15; // Ganar 15 veces la apuesta
            showStatus("Congratulations! You won!", "success");
        } else {
            balance -= betAmount; // Perder la apuesta
            showStatus("You lost, spin again.", "danger");
        }
        updateBalance();
    }

    // Deshabilitar los controles mientras se realiza el giro
    function disableControls() {
        $(".bet-controls button, #betbutton").prop("disabled", true);
    }

    // Habilitar los controles después del giro
    function enableControls() {
        $(".bet-controls button, #betbutton").prop("disabled", false);
    }
});
