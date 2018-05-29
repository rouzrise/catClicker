var model = {
    cats: [
        {
            clickCount: 0,
            catName: 'Vasya',
            src: 'images/cat1.jpg'
        },
        {
            clickCount: 0,
            catName: 'Grey',
            src: 'images/cat2.jpg'
        },
        {
            clickCount: 0,
            catName: 'Kitya',
            src: 'images/cat3.jpg'
        },
        {
            clickCount: 0,
            catName: 'Murzik',
            src: 'images/cat4.jpg'
        },
        {
            clickCount: 0,
            catName: 'Pushok',
            src: 'images/cat5.jpg'
        }
    ],

    currentCat: null
};

var octopus = {
    init: function() {
        
        //устанавливает в качестве текущего кота - первого кота из списка модели
        model.currentCat = model.cats[0];
       
        //запускает функцию инит для Вью списка котов и Вью текущего кота
        catListView.init();
        currentCatView.init();
        
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        currentCatView.render();
    }

};

var currentCatView = {
    init: function() {
        this.cat = document.querySelector('#cat');
        this.catName = document.querySelector('#catName');
        this.catPicture = document.querySelector('.catPicture');
        this.clickCount = document.querySelector('.clickMessage');
        

        //в самый первый раз мы присваиваем кэтпикче ивентлисенер - и этого достаточно;
        this.catPicture.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        //в первый раз устанавливаем нужные значения для текущего currentCat
        this.render();
    },

    render: function() {
        ///////////при помощи октопуса присваиваем текущего кота из модели
        var currentCat = octopus.getCurrentCat();

        //присвоить в DOM кота свойства текущего кота из Модели
        this.clickCount.textContent = currentCat.clickCount;
        this.catName.textContent = currentCat.catName;
        
        this.catPicture.src = currentCat.src;
    }
    
};

var catListView = {
    init: function() {
        
        this.catList = document.querySelector('#catList');

        // впервые мы создаем этот лист (и один единственный раз)
        this.render();
    },

    render: function() {
        // debugger
        var i, cat, elem;
        /////////при помощи октопуса присваиваем переменной текущих котов всех котов из Модели
        var cats = octopus.getCats();

        //очищаем пространство
        this.catList.innerHTML = '';

        for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            elem = document.createElement('li');
            elem.textContent = cat.catName;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    ////в зону видимости добавляет кота из лупа:

                    ///////устанавливает текущим котом кота из лупа при помощи октопуса
                    octopus.setCurrentCat(catCopy);
                    //добавляет в зону видимости все качества текущего кота 
                    currentCatView.render();
                };
            })(cat));//при помощи call back

            this.catList.appendChild(elem);
        }
    }
};

octopus.init();


// var container = document.querySelector('.container');
// var count = document.querySelector('.count');
// var catList = document.createElement('ul');
// catList.classList.add('catList');



// var catNames = ['Vasya', 'Grey', 'Kitya', 'Murzik', 'Pushok'];
// var catImages = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];
// var clickCount = [0, 0, 0, 0, 0];

// for (var i = 0; i < catImages.length; i++) {

//     var catItem = document.createElement('li');
//     catItem.innerText = `${catNames[i]}`;
//     catList.appendChild(catItem);

//     catItem.addEventListener('click', (function(iCopy) {
//         return function() {
//             container.innerHTML = '';
//             const signature = document.createElement('p');
//             signature.classList.add('catName');
//             signature.innerText = catNames[iCopy];
//             container.appendChild(signature);
//             const imgContainer = document.createElement('div');
//             imgContainer.innerHTML = `<img src="images/${catImages[iCopy]}.jpg" alt="Cat" class="catPicture">`;
//             container.appendChild(imgContainer);  
//             const clickMessage = document.createElement('p');
//             clickMessage.classList.add(`clickMessage${iCopy}`);
//             clickMessage.innerText = `You clicked this picture ${clickCount[iCopy]} times`;
//             container.appendChild(clickMessage); 
//         };
//     })(i));

//     document.querySelector('.list').append(catList);
// };

// function initialCat () {
//     const signature = document.createElement('p');
//         signature.classList.add('catName');
//         signature.innerText = catNames[0];
//         container.appendChild(signature);
//         const imgContainer = document.createElement('div');
//         imgContainer.innerHTML = '<img src="images/cat1.jpg" alt="Cat" class="catPicture">';
//         container.appendChild(imgContainer);  
//         const clickMessage = document.createElement('p');
//         clickMessage.classList.add('clickMessage0');
//         clickMessage.innerText = `You clicked this picture 0 times`;
//         container.appendChild(clickMessage);
// }

// initialCat();

// function respondToTheClick(e) {
//     e.preventDefault();
//     let catPicture = e.target;

//     for (var i = 0; i < clickCount.length; i++) {
//         if (catPicture.classList.contains('catPicture') === true && document.querySelector(`.clickMessage${i}`)) {
//             clickCount[i] = clickCount[i] + 1;
//             // debugger
//             var clickMessageI = document.querySelector(`.clickMessage${i}`);
//             clickMessageI.innerText = `You clicked this picture ${clickCount[i]} times`;
//         }
//     }
// };

// container.addEventListener('click', respondToTheClick);
