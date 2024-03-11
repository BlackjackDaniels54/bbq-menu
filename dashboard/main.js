const Burger = document.querySelector('#burger-icon');
const sidebar = document.querySelector('#sidebar');
const tabsContainer = document.getElementById('tabsContainer');
const overlay = document.getElementById('overlay');


Burger.addEventListener('click', function() {
    overlay.classList.toggle('active');
    this.classList.toggle('active');
    sidebar.classList.toggle('active');
})

overlay.addEventListener('click', (e) => {
    if(e.target.classList.contains('active')){
        overlay.classList.toggle('active');
        Burger.classList.toggle('active');
        sidebar.classList.toggle('active');
    }
    
})



tabsContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'LI') {
        
        const allTabs = tabsContainer.querySelectorAll('li');
        allTabs.forEach(tab => tab.classList.remove('active'));

        
        clickedElement.classList.add('active');
    }
});