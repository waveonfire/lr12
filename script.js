$(document).ready(function () {
    let stepCounter = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let selectedlevel = $("input[name='level']:checked").val();
    $("#checkbutton").on("click", checkAnswer);
    $("#close-modal").on("click", closeModal);
    const easydictionary = [
        { word: "friend", translate: "Друг" },
        { word: "coffee", translate: "Кофе" },
        { word: "house", translate: "Будинок" },
        { word: "school", translate: "Школа" },
        { word: "kitchen", translate: "Кухня" },
        { word: "sing", translate: "Співати" },
        { word: "office", translate: "Офіс" },
        { word: "change", translate: "Змінювати" },
        { word: "grandmother", translate: "Бабуся" },
        { word: "dance", translate: "Танцювати" },
    ];
    const mediumdictionary = [
        { word: "knowledge", translate: "Знання" },
        { word: "experience", translate: "Досвід" },
        { word: "success", translate: "Успіх" },
        { word: "influence", translate: "Вплив" },
        { word: "failure", translate: "Невдача" },
        { word: "accurate", translate: "Точний" },
        { word: "motivation", translate: "Мотивація" },
        { word: "government", translate: "Уряд" },
        { word: "education", translate: "Освіта" },
        { word: "solution", translate: "Рішення" },
    ]
    const harddictionary = [
        { word: "veracity", translate: "Правдивість" },
        { word: "acknowledge", translate: "Підтвердити" },
        { word: "outcome", translate: "Результат" },
        { word: "contradict", translate: "Суперечити" },
        { word: "robust", translate: "Міцний" },
        { word: "bias", translate: "Упередженість" },
        { word: "clarity", translate: "Ясність" },
        { word: "hostage", translate: "Заручник" },
        { word: "decry", translate: "Засуджувати" },
        { word: "forsaken", translate: "Покинутий" },
    ]
    const easydictionarysorted = easydictionary.sort(() => 0.5 - Math.random());
    const mediumdictionarysorted = mediumdictionary.sort(() => 0.5 - Math.random());
    const harddictionarysorted = harddictionary.sort(() => 0.5 - Math.random());

    function updateStatus() {
        $("#stat").html(`<h3>Step ${stepCounter + 1} of 10 | Correct answers: ${correctAnswers} | Wrong answers: ${wrongAnswers}</h3>`);
    }

    function newWord() {
        if (selectedlevel == "beginner") {
            if (stepCounter < easydictionarysorted.length) {
                let currentWord = easydictionarysorted[stepCounter];
                $(".mainblock > p").text(currentWord.word);
                $("#inputtext").val("");
                updateStatus();
            } else {
                showModal();
            }
        }
        else if (selectedlevel == "intermediate")
        {
            if (stepCounter < mediumdictionarysorted.length) {
                let currentWord = mediumdictionarysorted[stepCounter];
                $(".mainblock > p").text(currentWord.word);
                $("#inputtext").val("");
                updateStatus();
            } else {
                showModal();
            }
        }
        else if (selectedlevel == "hard")
        {
            if (stepCounter < harddictionarysorted.length) {
                let currentWord = harddictionarysorted[stepCounter];
                $(".mainblock > p").text(currentWord.word);
                $("#inputtext").val("");
                updateStatus();
            } else {
                showModal();
            }
        }    
    }

    function checkAnswer() {
        const currentDictionary = selectedlevel === "beginner" ? easydictionarysorted :selectedlevel === "intermediate" ? mediumdictionarysorted : harddictionarysorted;
        let currentWord = currentDictionary[stepCounter];
        let userAnswer = $("#inputtext").val().trim();
    
        if (userAnswer.toLowerCase() === currentWord.translate.toLowerCase()) {
            correctAnswers++;
            alert("Correct!");
        } else {
            wrongAnswers++;
            alert(`Wrong! The correct answer is: ${currentWord.translate}`);
        }
    
        stepCounter++;
        newWord();
    }

    $("input[name='level']").on("click", function(){
        if (selectedlevel != $(this).val()) 
        {
            selectedlevel = $(this).val();
            restart();
        }
    });

    function showModal() {
        const totalWords = selectedlevel === "beginner" ? easydictionary.length :selectedlevel === "intermediate" ? mediumdictionary.length : harddictionary.length;
        const accuracy = ((correctAnswers / totalWords) * 100).toFixed(2);
    
        $("#result-text").html(`You translated ${correctAnswers} out of ${totalWords} words correctly.<p>Your accuracy: ${accuracy}%.</p>`);
        $("#modal").fadeIn();
    }
    

    function closeModal() {
        $("#modal").fadeOut();
        restart();
    }

    function restart() {
        stepCounter = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
    
        easydictionarysorted.sort(() => 0.5 - Math.random());
        mediumdictionarysorted.sort(() => 0.5 - Math.random());
        harddictionarysorted.sort(() => 0.5 - Math.random());
    
        newWord();
    }
    newWord();
});
