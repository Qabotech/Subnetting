

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
        var octetD = document.querySelectorAll(".octetD");
        var octetB = document.querySelectorAll(".octetB");
        var mask = document.querySelectorAll(".mask");
        var maskD = document.querySelectorAll(".maskD");
        var netA = document.querySelectorAll(".net");
        var netD = document.querySelectorAll(".netD");
        var broad = document.querySelectorAll(".broad");
        var broadB = document.querySelectorAll(".broadB");
        var GW = document.querySelectorAll(".GW");
        var rest = 32 - x;
        var Binaer = [];
        var ipB = [];
        var maskT = [];
        var ipBT = [];
        var netT = [];
        var bits = [];
        var broadT = [];
        var y = "";
        var net = "";

        //IP binär
        function ipSplit(input) {
            ipD = input.split('.');
            for (let i = 0; i < ipD.length; i++) {
                ipB[i] = convertToBinary(ipD[i]);
                $(octetD[i]).html(ipD[i]);
                $(octetB[i]).html(ipB[i]);

                bits[i] = $(octetB[i]).text();
                var bit = 8 - bits[i].length
                if (bits[i].length < 8) {
                    for (let j = 0; j < bit; j++) {
                        bits[i] = "0" + bits[i];
                        $(octetB[i]).html(bits[i]);
                    }
                }
            }
        }
        ipSplit(ip);


        //broadcast binär 
        for (let i = 0; i < 4; i++) {
            Binaer[i] = $(octetB[i]).text();
            var broadcast;
            broadcast = broadcast + Binaer[i];
            broadcast = broadcast.replace("undefined", "");
        }
        broadcast = broadcast.slice(0, x);
        for (let i = 0; i < 32 - x; i++) {
            broadcast = broadcast + "1";
        }
        $(broadB[0]).html(broadcast.slice(0, 8));
        $(broadB[1]).html(broadcast.slice(8, 16));
        $(broadB[2]).html(broadcast.slice(16, 24));
        $(broadB[3]).html(broadcast.slice(24, 32));

        //borad dezimal
        for (let i = 0; i < 4; i++) {
            broadT[i] = $(broadB[i]).text();
        }
        $(broad[0]).html(parseInt(broadT[0], 2));
        $(broad[1]).html(parseInt(broadT[1], 2));
        $(broad[2]).html(parseInt(broadT[2], 2));
        $(broad[3]).html(parseInt(broadT[3], 2));

        for (let i = 0; i < x; i++) {
            y += '1';
        }
        for (let i = 0; i < rest; i++) {
            y += '0';
        }
        y.replace(" 0 ", " 1 ");

        //subnetzmakse 
        $(mask[0]).html(y.substring(0, 8));
        $(mask[1]).html(y.substring(8, 16));
        $(mask[2]).html(y.substring(16, 24));
        $(mask[3]).html(y.substring(24, 32));

        $(maskD[0]).html(parseInt(y.substring(0, 8), 2));
        $(maskD[1]).html(parseInt(y.substring(8, 16), 2));
        $(maskD[2]).html(parseInt(y.substring(16, 24), 2));
        $(maskD[3]).html(parseInt(y.substring(24, 32), 2));

        for (let i = 0; i < 4; i++) {
            maskT[i] = $(mask[i]).text();
            ipBT[i] = $(octetB[i]).text();
            netT[i] = $(netA[i]).text();

        }

        //logische und
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

        //netzadresse binär
        function append(element) {
            $(element[0]).html(net.substring(0, 8));
            $(element[1]).html(net.substring(8, 16));
            $(element[2]).html(net.substring(16, 24));
            $(element[3]).html(net.substring(24, 32));
        }
        append(netA);

        //netzadresse
        function appendD(element) {
            $(element[0]).html(parseInt(net.substring(0, 8), 2));
            $(element[1]).html(parseInt(net.substring(8, 16), 2));
            $(element[2]).html(parseInt(net.substring(16, 24), 2));
            $(element[3]).html(parseInt(net.substring(24, 32), 2));
        }
        appendD(netD);
        //Gateway
        appendD(GW);
        $(GW[3]).html("1");

        //animation
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

            $(td[i]).addClass("transition");

        }

    }

);
function alphaOnly(event) {
    var key = event.keyCode;
    return (key == 8);
};
