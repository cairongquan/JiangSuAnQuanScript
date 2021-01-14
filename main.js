const buttonOne = document.getElementById("buttonOne");

buttonOne.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "http://localhost:3000");
    xhr.setRequestHeader("Cookie", "ASP.NET_SessionId=uub3e4w5t1jx4wc4tz2vvt3a; auth=0102E6D1F22077B7D808FEE6915C4B40B8D80801156C00740069003800610077006F007300700037007800660037006100660078006D00680068007A00610000012F00FFAAE90B30F16B4E7B83AC9AAA8F8D47371C428408");

    xhr.send();

    xhr.onload = function () {
        console.log(JSON.parse(xhr.responseText));
    }
})


