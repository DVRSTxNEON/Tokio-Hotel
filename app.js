document.addEventListener("DOMContentLoaded", () => {

    const fondos = {
        Tom: "img/tom.jpg",
        Georg: "img/georg.jpg",
        Bill: "img/bill.jpg",
        Gustav: "img/gustav.jpg"
    };

    document.querySelectorAll(".integrante").forEach(item => {
        item.addEventListener("click", () => {
            document.body.style.backgroundImage =
                `url('${fondos[item.id]}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundRepeat = "no-repeat";
        });
    });

});

