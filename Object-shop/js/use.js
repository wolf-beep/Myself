const oDiv = document.querySelector('.banner');
const arr = [{
        src: './images/1.jpg'
    },
    {
        src: './images/2.jpg'
    },
    {
        src: './images/4.jpg'
    },
    {
        src: './images/3.jpg'
    }
];
const oTab = new Loop(oDiv, arr);
oTab.init();