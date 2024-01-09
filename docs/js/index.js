
function crete_noise(canvas) {
    let ctx = canvas.getContext('2d');
    function noise() {
        window.addEventListener('resize', updateCanvasSize);
        updateCanvasSize();
        render();
    }
    function getRandom() {
        return Math.random() * 255;
    }
    function render() {
        let imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const color = getRandom();
            imageData.data[i]     = color;
            imageData.data[i + 1] = color;
            imageData.data[i + 2] = color;
            imageData.data[i + 3] = 200;
        }
        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(render);
    }
    function updateCanvasSize() {
        ctx.canvas.height = canvas.offsetHeight;
        ctx.canvas.width  = canvas.offsetWidth;
    }
    noise();
}
document.querySelectorAll('.noise').forEach((el) => {
    crete_noise(el)
})

document.querySelectorAll('.shuffle-text').forEach((el) => {

    el.addEventListener('mouseleave', () => {
        document.querySelector('marquee').remove()
        anime({
            targets: '.noise',
            opacity: 1,
            duration: 499,
        })
    })
    el.addEventListener('mouseover', () => {
        let marquee = document.createElement('marquee');
        marquee.textContent = el.dataset.initialText;
        marquee.behavior = 'scroll';
        marquee.direction = 'right';
        marquee.setAttribute('scrollamount', 25) ;
        marquee.className = 'scrolling-text';
        document.querySelector('header').append(marquee)
        anime({
            targets: '.noise',
            opacity: 0,
            duration: 500,
        })
    })

})