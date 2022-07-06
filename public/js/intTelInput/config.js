var input = document.querySelector("#tel");
var iti = window.intlTelInput(input,({
    preferredCountries: ["ar","co"],
    nationalMode: true,
    formatOnDisplay:false,
    utilsScript: "/js/intTelInput/utils.js",
    hiddenInput: "full_phone",
}));
