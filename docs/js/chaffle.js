
let chaffleElements = document.querySelectorAll('[data-chaffle]')
chaffleElements.forEach(function (element) {
    const chaffle = new Chaffle(element)
    element.addEventListener('mouseover', function () {
        chaffle.init()
    })
})