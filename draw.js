function createGallery() {
    for (let i in data.items) {
        const newItem = document.createElement('a');
        newItem.className = 'item';
        newItem.id = `${i}_item`;
        newItem.target = '_blank';
        if (data.items[i].hasOwnProperty('videoUrl')) {
            newItem.setAttribute('href', data.items[i].videoUrl);
        } else {
            newItem.setAttribute('href', data.items[i].imageUrl);
        }

        const newImg = document.createElement('img');
        newImg.src = `data:image/jpg;base64, ${data.items[i].image}`;

        newItem.append(newImg);
        document.getElementById('gallery').append(newItem);
    }
}


