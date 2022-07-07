
// Get the modal
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let btn = document.querySelector("button#ok");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

btn.onclick = function (){
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
//modal.style.display = "block";


const emoji = document.querySelector(".emoji");
const sentiment = document.querySelector(".sentiment");

document.querySelector("ul#reviews").addEventListener("click",function(e){
    if(e.target.classList.contains("analyze")){
        e.preventDefault();
        const anchor = e.target;

        fetch(`${anchor.getAttribute("href")}`)
        .then(res => {
            if(!res.ok)
                res.json().then(msg => alert(`An error occured please try again! Error:${msg}`));
            else                
                return res.json();
        })
        .then(score => {
            if(score > 0){
                emoji.innerHTML = "<p>😄</p>";
                sentiment.innerHTML = "<p>➕ Positive</p>";
            }else if(score === 0){
                emoji.innerHTML = "<p>😐</p>";
                sentiment.innerHTML = "<p>Neutral !!!</p>";
            }else{
                emoji.innerHTML = "<p>😡</p>";
                sentiment.innerHTML = "<p>➖ Negative</p>";
            }
            modal.style.display = "block";
        });
    }
});