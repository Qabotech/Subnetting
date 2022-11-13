
function convertToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}


$("#send").click(
    function () {

        var ip = $('.inIp').val();
        var x = $('.anteil').val();
        var rest = 32 - x;
        var ipB = [];
        var maskT = [];
        var ipBT = [];
        var netT = [];
        var octetD = document.querySelectorAll(".octetD");
        var octetB = document.querySelectorAll(".octetB");
        var mask = document.querySelectorAll(".mask");
        var netA = document.querySelectorAll(".net");
        var netD = document.querySelectorAll(".netD");
        var broad = document.querySelectorAll(".broad");
        var GW = document.querySelectorAll(".GW");

        var y = "";
        var net = "";
        function ipSplit(input) {
            ipD = input.split('.');
            for (let i = 0; i < ipD.length; i++) {
                ipB[i] = convertToBinary(ipD[i]);
                $(octetD[i]).html(ipD[i]);
                $(octetB[i]).html(ipB[i]);
            }
        }
        ipSplit(ip);

        for (let i = 0; i < x; i++) {
            y += '1';
        }
        for (let i = 0; i < rest; i++) {
            y += '0';
        }
        y.replace(" 0 ", " 1 ");
        for (let i = 0; i < x; i++) {
        }

        $(mask[0]).html(y.substring(0, 8));
        $(mask[1]).html(y.substring(8, 16));
        $(mask[2]).html(y.substring(16, 24));
        $(mask[3]).html(y.substring(24, 32));

        for (let i = 0; i < 4; i++) {
            maskT[i] = $(mask[i]).text();
            ipBT[i] = $(octetB[i]).text();
            netT[i] = $(netA[i]).text();

        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 8; j++) {
                if (ipBT[i][j] == 0 && maskT[i][j] == 0) {
                    net += "0"
                }
                else if (ipBT[i][j] == 1 && maskT[i][j] == 1) {

                    net += "1"
                }
                else {
                    net += "0"
                }
            }
        }
        function append(element) {
            $(element[0]).html(net.substring(0, 8));
            $(element[1]).html(net.substring(8, 16));
            $(element[2]).html(net.substring(16, 24));
            $(element[3]).html(net.substring(24, 32));
        }
        append(netA);
        function appendD(element) {
            $(element[0]).html(parseInt(net.substring(0, 8), 2));
            $(element[1]).html(parseInt(net.substring(8, 16), 2));
            $(element[2]).html(parseInt(net.substring(16, 24), 2));
            $(element[3]).html(parseInt(net.substring(24, 32), 2));
        }
        appendD(netD);
        appendD(broad);
        appendD(GW);
        $(broad[3]).html("255");
        $(GW[3]).html("1");

        if ($('.inIp').val() == '' || $('.anteil').val() == '') {
            alert("Bitte fühlen sie alle eingabefleder");
            $(".td").html("");
        } else {
            $(".overlay").addClass("transition");
            setTimeout(() => {
                $(".overlay").hide();
            }, 2000);
        }
        var td = document.querySelectorAll(".td");
        for (let i = 0; i < td.length; i++) {

            $(td[i]).addClass("transition")

        }
    }

);
function alphaOnly(event) {
    var key = event.keyCode;
    return (key == 8);
};
