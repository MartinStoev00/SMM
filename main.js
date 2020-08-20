let bgSign = "BG"
let enSign = "EN"
let langBtn = document.getElementsByClassName("header__lang__btn")[0]
let langBtnArrow = langBtn.getElementsByTagName("i")[0]
let langDropdown = document.getElementsByClassName("header__lang__dropdown")[0]

let headerHeightWindow = () => {
    let headerH = document.getElementsByClassName("header")[0].getBoundingClientRect().height;
    document.getElementsByClassName("header__placeholder")[0].style.height = (headerH) + "px";
}
let btns = document.querySelectorAll("[data-btn]");
let bg = document.querySelectorAll('[data-lang="bg"]')
let en = document.querySelectorAll('[data-lang="en"]')
let hideEn = () => {
    en.forEach((enBlock) => {
        enBlock.style.display = "none";
    })
    bg.forEach((bgBlock) => {
        bgBlock.style.display = "inline";
    })
}
let hideBg = () => {
    en.forEach((enBlock) => {
        enBlock.style.display = "inline";
    })
    bg.forEach((bgBlock) => {
        bgBlock.style.display = "none";
    })
}
if(window.location.hash) {
    if(window.location.hash === `#${enSign}`) {
        hideBg()
    } else {
        hideEn()
    }
}


window.onresize = headerHeightWindow;
window.onload = headerHeightWindow;

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if(btn.getAttribute("href") === `#${enSign}`) {
            hideBg()
        } else {
            hideEn()
        }
        setTimeout(() => {
            if(btn.parentElement.className == "header__lang__dropdown") {
                langDropdown.style.display = "none"
                langBtnArrow.style.transform = "rotate(0deg)"
                let btnTopA = langBtn.getElementsByTagName("a")[0]
                let btnTopLink = btnTopA.href.split("#")[1]
                let btnBotLink = btn.href.split("#")[1]
                btnTopA.href = `#${btnBotLink}`
                btn.href = `#${btnTopLink}`
                btnTopA.getElementsByTagName("img")[0].src = `./pics/flag-${btnBotLink}.png`
                btn.getElementsByTagName("img")[0].src = `./pics/flag-${btnTopLink}.png`
            }
        }, 50)
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

langBtn.addEventListener("fade", () => {
    setTimeout(() => {
        langDropdown.style.display = "none"
        langBtnArrow.style.transform = "rotate(0deg)"
    }, 100)
});