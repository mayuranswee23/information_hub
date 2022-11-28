async function upvoteClickHandler(event){
    event.preventDefault(); 

    console.log('clicked');
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);