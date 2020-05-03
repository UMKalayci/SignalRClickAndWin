let connection = null;
let sectionDiv = null;
let kullaniciPuan = 0;
setupConnection = () => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("/clickHub")
        .build();

    connection.on("ReceiveUpdatePossition", (update) => {
        for (i = 1; i < 6; i++) {
            for (var j = 0; j < 10; j++) {
                const item = document.getElementById("column" + i + j);
                item.style.background = "#FFFFFF";
            }

        }
        if (update != "0") {

            sectionDiv = document.getElementById("column" + update);
            sectionDiv.style.background = "#FF0000";
        }
    }
    );

    connection.on("ReceiveUpdatePuan", (puan) => {
        document.getElementById("rakip").innerHTML = puan;
    }
    );
    connection.on("Send", (update) => {

    }
    );

    connection.start().then(function () {
        connection.invoke("AddToGroup", getUrlParam('AgAdi', 'Empty'));
        connection.invoke("GetButtonPossition", getUrlParam('AgAdi', 'Empty'), 0);
    }).catch(err => console.error(err.toString()));


};

setupConnection();
function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//document.getElementById("submit").addEventListener("click", e => {
//    document.getElementById("submit").style.visibility = 'hidden';
//    e.preventDefault();
//    fetch("/Home",
//        {
//            method: "POST",
//            body: "",
//            headers: {
//                'content-type': 'application/json'
//            }
//        })
//        .then(response => response.text())
//        .then(id => connection.invoke("GetButtonPossition", "test", 0));
//    document.getElementById("kullanici").innerHTML = puan;
//});

function DivClick(divname) {
    if (sectionDiv.id == divname) {
        {
            puan++;
            document.getElementById("kullanici").innerHTML = kullaniciPuan;
            connection.invoke("GetButtonPossition", "test", kullaniciPuan);
        }
    }
}