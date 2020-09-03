class Loop {
    constructor(element, imgArr) {
        this.ele = element;
        this.arr = imgArr;

        this.ul = this.ele.querySelector('ul');
        this.ol = this.ele.querySelector('ol');

        this.ullis = {};
        this.ollis = {};

        this.index = 0;
        this.time = 0;
    }
    init() {
        this.setLi();
        this.autoLoop();
        this.mouseMove();
        this.setClick();
    }
    setLi() {
        let ulliStr = '';
        let olliStr = '';
        this.arr.forEach(function (item, key) {
            if (key === 0) {
                ulliStr += `<li style="opacity:1"><img src="${item.src}"></li>`;
                olliStr += `<li class="active" num="${key}" name="olli"></li>`;
            } else {
                ulliStr += `<li><img src="${item.src}"></li>`;
                olliStr += `<li num="${key}" name="olli"></li>`;
            }
        })
        this.ul.innerHTML = ulliStr;
        this.ol.innerHTML = olliStr;

        this.ullis = this.ele.querySelectorAll('ul>li');
        this.ollis = this.ele.querySelectorAll('ol>li');
    }

    change(type) {
        this.ullis[this.index].style.opacity = 0;
        if (type === 'left') {
            this.index--;
        } else if (type === 'right') {
            this.index++;
        } else {
            this.index = type;
        }
        if (this.index > this.arr.length - 1) {
            this.index = 0;
        }
        if (this.index < 0) {
            this.index = this.arr.length - 1;
        }
        this.ullis[this.index].style.opacity = 1;
        this.ollis.forEach((e, k) => {
            e.className = '';
            if (k === this.index) {
                e.className = 'active';
            }

        })
    }

    autoLoop() {
        this.time = setInterval(() => {
            this.change('right');
        }, 5000)
    }
    mouseMove() {
        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })
        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }
    setClick() {
        this.ele.addEventListener('click', (e) => {
            if (e.target.getAttribute('name') === 'left') {
                this.change('left');
            } else if (e.target.getAttribute('name') === 'right') {
                this.change('right');
            } else if (e.target.getAttribute('name') === 'olli') {
                this.change(e.target.getAttribute('num') - 0);
            }
        })
    }
}