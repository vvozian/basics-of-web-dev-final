const paragraphAbout = document.getElementById("paragraph-about-1");

function dynamicAgeReplace(...args) {
    paragraphAbout.innerText = paragraphAbout.innerText.replace(
        "{{age}}",
        yearsFromDate("2003/08/08")
    )
}

function showContacts() {
    alert("Email: vozian.va@gmail.com\nLinkedIn: linkedin.com/vvozian")
}

(() => { dynamicAgeReplace() })()