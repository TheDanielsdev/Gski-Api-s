const addCommentBtn = document.querySelector('#add-comment-btn');
addCommentBtn.onclick = function() {
    const nameInput = document.querySelector('#name');
    const commentIput = document.querySelector('#email');
    const name = nameInput.value;
    const comment = commentIput.value;
    // window.location.reload();
   


if(nameInput.value == "") {
    alert('Field Cannot be empmty');
   } else {
    fetch('http://localhost:5000/newsletter', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({firstname : name, email: comment })
    })
    .then(response => response.json())
    .then(data => data['data']);
    // console.log(data)
    // console.log(response)
   }
//    nameInput.value = "";
//    commentIput.value = "";
}


// function insertRowIntoCol(data) {

// }



// ####### Add comment or POST comment

const addComment = document.querySelector('#add-comment');
addComment.onclick = function() {
    const nameInput = document.querySelector('#name-comment');
    const commentIput = document.querySelector('#email-comment');
    const name_com = nameInput.value;
    const comment_com = commentIput.value;
    // window.location.reload();
   


if(nameInput.value == "") {
    alert('Field Cannot be empmty');
   } else {
    fetch('http://localhost:5000/comment', {
        headers: {
            'Content-type' : 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name_com, comment: comment_com })
    })
    .then(response => response.json())
    .then(data => data['data']);
    // console.log(data)
    // console.log(response)
   }
//    nameInput.value = "";
//    commentIput.value = "";
}



document.addEventListener('DOMContentLoaded' , function (){
    fetch('http://localhost:5000/getAllCommentsIndexPage')
    .then(response => response.json())
    .then(data => fetchMinee(data['data']));



});


        function fetchMinee(data) {
        const userCardTemplate = document.querySelector("[data-user-card]");
        const userCardCont = document.querySelector("[data-user-container]");
        // console.log(data)
        let dataJson = JSON.stringify(data);
        // console.log(dataJson);
        localStorage.setItem('names', dataJson)
        console.log(localStorage)
           
   
        data.forEach(function ({name, comment, date_added}) {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            const com = card.querySelector("[data-comm]");
            header.textContent = name,
            body.textContent = date_added,
            com.textContent = comment
            userCardCont.append(card);
           
           
            });   
       
 
    } 