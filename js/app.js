const container = document.querySelector('.container');
var count = document.querySelector('.count');
// count.innerText = clickCount;

var nums = [1,2,3];

var catList = document.createElement('ul');
catList.classList.add('catList');
var catNames = ['Vasya', 'Grey', 'Kitya', 'Murzik', 'Pushok'];
var catImages = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
var clickCount = [0, 0, 0, 0, 0];

for (var i = 0; i < catImages.length; i++) {

    var catItem = document.createElement('li');
    catItem.innerText = `${catNames[i]}`;
    catList.appendChild(catItem);

    catItem.addEventListener('click', (function(iCopy) {
        return function() {
            container.innerHTML = '';
            const signature = document.createElement('p');
            signature.classList.add('catName');
            signature.innerText = catNames[iCopy];
            container.appendChild(signature);
            const imgContainer = document.createElement('div');
            imgContainer.innerHTML = `<img src="images/${catImages[iCopy]}.jpg" alt="Cat" class="catPicture">`;
            container.appendChild(imgContainer);  
            const clickMessage = document.createElement('p');
            clickMessage.classList.add(`clickMessage${iCopy}`);
            clickMessage.innerText = `You clicked this picture ${clickCount[iCopy]} times`;
            container.appendChild(clickMessage); 
        };
    })(i));

    document.querySelector('.list').append(catList);
};

function initialCat () {
    const signature = document.createElement('p');
        signature.classList.add('catName');
        signature.innerText = catNames[0];
        container.appendChild(signature);
        const imgContainer = document.createElement('div');
        imgContainer.innerHTML = '<img src="images/cat1.jpg" alt="Cat" class="catPicture">';
        container.appendChild(imgContainer);  
        const clickMessage = document.createElement('p');
        clickMessage.classList.add('clickMessage0');
        clickMessage.innerText = `You clicked this picture 0 times`;
        container.appendChild(clickMessage);
}

initialCat();

function respondToTheClick(e) {
    e.preventDefault();
    let catPicture = e.target;

    for (var i = 0; i < clickCount.length; i++) {
        if (catPicture.classList.contains('catPicture') === true && document.querySelector(`.clickMessage${i}`)) {
            clickCount[i] = clickCount[i] + 1;
            // debugger
            var clickMessageI = document.querySelector(`.clickMessage${i}`);
            clickMessageI.innerText = `You clicked this picture ${clickCount[i]} times`;
        }
    }
};

container.addEventListener('click', respondToTheClick);

// function respondToTheClick(e) {
//     e.preventDefault();
//     let catPicture = e.target;

//     if (catPicture.classList.contains('catPicture') === true && document.querySelector('.clickMessage0')) {
//         clickCount[0] = clickCount[0] + 1;
//         // debugger
//         var clickMessage0 = document.querySelector('.clickMessage0');
//         clickMessage0.innerText = `You clicked this picture ${clickCount[0]} times`;
//     }

//     else if (catPicture.classList.contains('catPicture') === true && document.querySelector('.clickMessage1')) {
//         clickCount[1] = clickCount[1] + 1;
//         // debugger
//         var clickMessage1 = document.querySelector('.clickMessage1');
//         clickMessage1.innerText = `You clicked this picture ${clickCount[1]} times`;
//     }

//     else if (catPicture.classList.contains('catPicture') === true && document.querySelector('.clickMessage2')) {
//         clickCount[2] = clickCount[2] + 1;
//         // debugger
//         var clickMessage2 = document.querySelector('.clickMessage2');
//         clickMessage2.innerText = `You clicked this picture ${clickCount[2]} times`;
//     }

//     else if (catPicture.classList.contains('catPicture') === true && document.querySelector('.clickMessage3')) {
//         clickCount[3] = clickCount[3] + 1;
//         // debugger
//         var clickMessage3 = document.querySelector('.clickMessage3');
//         clickMessage3.innerText = `You clicked this picture ${clickCount[3]} times`;
//     }

//     else if (catPicture.classList.contains('catPicture') === true && document.querySelector('.clickMessage4')) {
//         clickCount[4] = clickCount[4] + 1;
//         // debugger
//         var clickMessage4 = document.querySelector('.clickMessage4');
//         clickMessage4.innerText = `You clicked this picture ${clickCount[4]} times`;
//     }
// };



// function createCatsGrid() {
//     var catNames = ['Vasya', 'Grey'];
//     var catImages = ['cat1', 'cat2'];
    
//     for (let i = 0; i < catImages.length; i++) {
//         const signature = document.createElement('p');
//         signature.innerText = catNames[i];
//         container.appendChild(signature);
//         const imgContainer = document.createElement('div');
//         imgContainer.innerHTML = `<img src="images/${catImages[i]}.jpg" alt="Cat" class="catPicture">`;
//         container.appendChild(imgContainer);
//     }
// }

// createCatsGrid();



// function respondToTheClick(e) {
//     e.preventDefault();
//     let catPicture = e.target;

//     // if none cards were open or one card was open before
//     if (catPicture.classList.contains('catPicture') === true) {
//         clickCount += 1;
//         count.innerText = clickCount;
//     }
// };

// container.addEventListener('click', respondToTheClick);
