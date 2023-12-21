const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstpage() {
    var t1 = gsap.timeline();
    t1.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.7,
        ease: Expo.easeInOut,
    })
    .to(".boundingelem", {
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger:.2,
    })
    .from("#homefooter", {
        y:-10,
        opacity: 0,
        duration: 1.5,
        delay:-1,
        ease: Expo.easeInOut,
    })
}

var timer;

function mousechapta() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timer);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        yprev = dets.clientY;
        xprev = dets.clientX;
        
        xscale = gsap.utils.clamp(.8, 1.2, ydiff);
        yscale = gsap.utils.clamp(.8, 1.2, xdiff);

        circlemousefollower(xscale, yscale)

        timer = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    
        }, 100);
    });
}
mousechapta();

function circlemousefollower(xscale,yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circlemousefollower();
firstpage();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function (dets) {
        
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power1,
            duration:0.5,
        });
    });
    elem.addEventListener("mousemove", function (dets) {
        
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
            rotate:gsap.utils.clamp(-20, 20, diffrot*0.4),
        });
    });
});