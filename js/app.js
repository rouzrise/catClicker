var model = {
    cats: [
        {
            clickCount: 0,
            catName: 'Vasya',
            src: 'images/cat1.jpg',
            status: 'hidden'
        },
        {
            clickCount: 0,
            catName: 'Grey',
            src: 'images/cat2.jpg',
            status: 'hidden'
        },
        {
            clickCount: 0,
            catName: 'Kitya',
            src: 'images/cat3.jpg',
            status: 'hidden'
        },
        {
            clickCount: 0,
            catName: 'Murzik',
            src: 'images/cat4.jpg',
            status: 'hidden'
        },
        {
            clickCount: 0,
            catName: 'Pushok',
            src: 'images/cat5.jpg',
            status: 'hidden'
        }
    ],

    currentCat: null,

    adminStatus: false
};

var octopus = {
    init: function() {
        
        //устанавливает в качестве текущего кота - первого кота из списка модели
        model.currentCat = model.cats[0];
       
        //запускает функцию инит для Вью списка котов и Вью текущего кота
        catListView.init();
        currentCatView.init();
        adminView.init();
        adminView.hide();
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
        //////////////////
        adminView.render();
    },

    toggleAdminView: function() {
        if (model.adminStatus === false) {
            model.adminStatus = true;
            // debugger
            adminView.show();
        }

        else {
            model.adminStatus = false;
            adminView.hide();
        }
    },

    saveAdminView: function() {
    //    debugger
       if (adminView.nameAdmin.value) {
           model.currentCat.catName = adminView.nameAdmin.value;
       }
       else if (adminView.urlAdmin.value) {
        model.currentCat.src = adminView.urlAdmin.value;
    }

    else if (adminView.numberClicksAdmin.value) {
        model.currentCat.clickCount = adminView.numberClicksAdmin.value;
    }
        adminView.reset();
        currentCatView.render();
        catListView.render();
   
    },

    cancelAdminView: function() {
        adminView.reset();
    }



};

var currentCatView = {
    init: function() {
        this.cat = document.querySelector('#cat');
        this.catName = document.querySelector('#catName');
        this.catPicture = document.querySelector('.catPicture');
        this.clickCount = document.querySelector('.clickMessage');
        this.adminStatus = document.querySelector('.adminForm');
        

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

var adminView = {

    init: function() {
        this.adminForm = document.querySelector('.adminForm');

        this.nameAdmin = document.querySelector('.nameAdmin');
        this.urlAdmin = document.querySelector('.urlAdmin');
        this.numberClicksAdmin = document.querySelector('.numberClicksAdmin');
        
        this.adminButton = document.querySelector('.adminButton');
        this.saveButton = document.querySelector('.saveButton');
        this.cancelButton = document.querySelector('.cancelButton');

        this.adminButton.addEventListener('click', function() {
            octopus.toggleAdminView();
        });

        this.saveButton.addEventListener('click', function() {
            octopus.saveAdminView();
        });

        this.cancelButton.addEventListener('click', function() {
            octopus.cancelAdminView();
        });

    },

    show: function() {
        this.adminForm.style.display = 'block';
    },

    hide: function() {
        this.adminForm.style.display = 'none';
    },

    reset: function() {
        this.nameAdmin.value = '';
        this.urlAdmin.value  = '';
        this.numberClicksAdmin.value  = '';
    }
};

octopus.init();

