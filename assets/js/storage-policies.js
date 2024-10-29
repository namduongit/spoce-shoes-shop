const infomation = document.querySelector(".inner-mid-1");
const policy = document.querySelector(".inner-mid-2");

infomation.querySelectorAll("ul li div").forEach(divItem => {
    divItem.addEventListener("click", console.log(divItem));
});