
let div = document.getElementById("question");

let i=0;
let totalScore = 0;


function renderQuestion(){

    let question = questions[i];

    div.innerHTML = `
    <h1 class="qTitle">Q. ${questions[i].name}</h1>
    <form id="myForm">
        <input type="radio" id="0" name="option" value="0">
        <label for="0">${question.options[0].title}</label><br>

        <input type="radio" id="1" name="option" value="1">
        <label for="1">${question.options[1].title}</label><br>

        <input type="radio" id="2" name="option" value="2">
        <label for="2">${question.options[2].title}</label><br>

        <input type="radio" id="3" name="option" value="3">
        <label for="3">${question.options[3].title}</label><br>

        <p id="message"></p>
        
</form> 
`
}


renderQuestion()


document.getElementById("nextQuestion").addEventListener("click", (e)=> {

    e.preventDefault()

    if(i<questions.length-1){
        i++;
        renderQuestion();

        if(i=== questions.length-1){
            document.getElementById("nextQuestion").style.display = "none"
        }
    }
    
    document.getElementById("submit").style.display = "block";
        document.getElementById("nextQuestion").style.display = "none"

})



document.getElementById("submit").addEventListener("click", (e)=>{

    e.preventDefault()

        let msg = document.getElementById("message");
        var correctAns = questions[i].answer; 
        
        if(document.querySelector('input[name="option"]:checked') === null){
            msg.innerHTML = "Select an option to proceed"
            msg.classList.remove("incorrect")
            msg.classList.remove("correct")
            msg.classList.add("warning")
        } else {
            let userAns = parseInt(document.querySelector('input[name="option"]:checked').value);
    
            if(correctAns === userAns){
                msg.innerHTML = "Correct"
                msg.classList.remove("incorrect")
                msg.classList.remove("warning")
                msg.classList.add("correct")
                totalScore += questions[i].marks;
                console.log(totalScore)
            } else {
                msg.innerHTML = "Incorrect"
                msg.classList.remove("correct")
                msg.classList.remove("warning")
                msg.classList.add("incorrect")
            }
    
            document.getElementById("0").disabled = true;
            document.getElementById("1").disabled = true;
            document.getElementById("2").disabled = true;
            document.getElementById("3").disabled = true;
            document.getElementById("submit").style.display = "none";
            if(i!==questions.length-1){
                document.getElementById("nextQuestion").style.display = "block"
            }
            if(i===questions.length-1){
                document.getElementById("finish").style.display = "block"
            }
        }

        
})


document.getElementById("finish").addEventListener("click", (e)=> {

     e.preventDefault();
        let totalMarks = 0;
    div.style.display = "none";

    questions.forEach(question => {
        totalMarks += question.marks;
    })


    document.getElementById("result").innerHTML = `
            <h3 id="totalMarks"><u>Total marks</u> : ${totalScore}/${totalMarks}</h3>

    `

    questions.forEach(question => {
        document.getElementById("result").innerHTML += `
           <p id="answerSheet">Q${question.id}. ${question.name} Ans : <span id="answer"> ${question.options[question.answer].title}</span></p> <br>
        `
    })

    document.getElementById("result").style.display = "block"

    if(div.style.display === "none"){
        document.getElementById("finish").style.display = "none"
        document.getElementById("refresh").style.display = "block"
    }
})

document.getElementById("refresh").addEventListener("click", ()=>{
    window.location.reload();
})