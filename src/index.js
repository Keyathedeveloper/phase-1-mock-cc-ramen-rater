// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');

    fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
// Iterate through ramens and add div
        ramens.forEach(ramen => {
            const img = document.createElement('img');
            img.src = ramen.image;
            img.alt = ramen.name;

            // Add event listener to image
            img.addEventListener('click', () => displayRamenDetails(ramen))

            ramenMenu.appendChild(img);
        });
    });

    function displayRamenDetails(ramen) {
        const ramenDetail = document.getElementById('ramen-detail');
        const ratingDisplay = document.getElementById('rating-display');
        const commentDisplay = document.getElementById('comment-display');

        ramenDetail.querySelector('.detail-image').src = ramen.image;
        ramenDetail.querySelector('.name').textContent = ramen.name;
        ramenDetail.querySelector('.restaurant').textContent = ramen.restaurant;

        ratingDisplay.textContent = ramen.rating;
        commentDisplay.textContent = ramen.comment;
    }

 const newRamenForm = document.getElementById('new-ramen');

 newRamenForm.addEventListener('submit', (Event) => {
    Event.preventDefault();


    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, restaurant, image, rating, comment})
    })

    .then(response => response.json())
    .then(newRamen => {

        const img = document.createElement('img');
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener('click', () => displayRamenDetails(newRamen));
        ramenMenu.appendChild(img);

    });
 });

const updateRamen = (ramenId, updateData) => {
    fetch('http://localhost:3000/ramens/${ramenId}', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })

    .then(response => response.json())
    .then(updateRamen => {

        displayRamenDetails(updateRamen);
    });
};



})
