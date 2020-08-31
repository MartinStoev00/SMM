let selectedArea = innerWidth < 768 ? "sidenav" : "header";
let touchstartX, touchendX = 0
let langBtn = document.getElementsByClassName(`${selectedArea}__lang__btn`)[0]
let langDropdown = document.getElementsByClassName(`${selectedArea}__lang__dropdown`)[0]
let langBtnArrow = langBtn.getElementsByTagName("i")[0]
let btns = document.getElementsByClassName(selectedArea)[0].querySelectorAll("[data-btn]");
let linksAnchor = document.getElementsByClassName(selectedArea)[0].getElementsByTagName('p')
let headerHeightWindow = () => {
    let headerH = document.getElementsByClassName("header")[0].getBoundingClientRect().height;
    document.getElementsByClassName("header__placeholder")[0].style.height = (headerH) + "px";
}
let showSelect = (input) => {
    document.querySelectorAll('[data-lang]').forEach((block) => {
        block.style.display = "none";
    })
    document.querySelectorAll(`[data-lang="${input.replace("#", "").toLowerCase()}"]`).forEach((block) => {
        block.style.display = "inline";
    })
}

window.onresize = headerHeightWindow
window.onload = headerHeightWindow

window.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].screenX
}, false)

window.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].screenX
    if (touchendX - 50 > touchstartX) {
        openNav()
    } else if (touchendX < touchstartX - 50) {
        closeNav()
    }
}, false)

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        showSelect(btn.getAttribute("href"))
        setTimeout(() => {
            if(btn.parentElement.className == `${selectedArea}__lang__dropdown`) {
                langDropdown.style.display = "none"
                langBtnArrow.style.transform = "rotate(0deg)"
                let btnTopA = langBtn.getElementsByTagName("a")[0]
                let btnTopLink = btnTopA.href.split("#")[1]
                let btnBotLink = btn.href.split("#")[1]
                btnTopA.href = `#${btnBotLink}`
                btn.href = `#${btnTopLink}`
                btnTopA.getElementsByTagName("img")[0].src = `./pics/flag-${btnBotLink}.png`
                btn.getElementsByTagName("img")[0].src = `./pics/flag-${btnTopLink}.png`
                closeNav()
            }
        }, 50)
    })
})

Array.prototype.forEach.call(document.querySelectorAll('[src="./pics/peak_logo.png"]'), (pic) => {
    pic.addEventListener('click', () => {
        $('html,body').animate({scrollTop: 0},'slow');
        closeNav()
    })
})

langBtn.addEventListener("click", () => {
    if(langDropdown.style.display == "block") {
        langDropdown.style.display = "none"
        langBtnArrow.style.transform = "rotate(0deg)"
    } else {
        langDropdown.style.display = "block"
        langBtnArrow.style.transform = "rotate(180deg)"
    }
});

Array.prototype.forEach.call(linksAnchor, (a) => {
    let anchTo = a.getAttribute("data-location")
    a.addEventListener("click", () => {
        $('html,body').animate({
            scrollTop: $(`.${anchTo}`).offset().top - 120},
            'slow');
            closeNav()
    });
})

if(window.location.hash) {
    showSelect(window.location.hash)
    btns.forEach((btn) => {
        if(langBtn.getElementsByTagName("a")[0].getAttribute("href") !== window.location.hash) {
            if(btn.getAttribute("href") === window.location.hash)  {
                btn.click()
            }
        }
    })
}

function openNav() {
    document.getElementsByClassName("sidenav")[0].style.width = "calc(100vw - 30px)";
    document.getElementsByClassName("header")[0].style.opacity = "0.6";
    document.getElementsByClassName("main")[0].style.opacity = "0.6";
    document.getElementsByClassName("footer")[0].style.opacity = "0.6";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#333"
}
  
  function closeNav() {
    document.getElementsByClassName("sidenav")[0].style.width = "0";
    document.getElementsByClassName("header")[0].style.opacity = "1";
    document.getElementsByClassName("main")[0].style.opacity = "1";
    document.getElementsByClassName("footer")[0].style.opacity = "1";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#fff"
  }