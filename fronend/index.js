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
