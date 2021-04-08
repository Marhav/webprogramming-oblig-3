
$(function () {
    hentBilletter()
    $("#danger_feedback").hide()
})

function hentBillett() {
    // Lagrer verdiene fra innputfeltene.
    const film = $("#inputFilm").val();
    const innAntall = $("#inputAntall").val();
    const innFornavn = $("#inputFornavn").val();
    const innEtternavn = $("#inputEtternavn").val();
    const innTelefonnr = $("#inputTelefonnr").val();
    const innEpost = $("#inputEpost").val();

    //Oppretter objekter til billetten.
    let antall
    let fornavn
    let etternavn
    let telefonnr
    let epost

    //Boolean må være true for at billetten skal kunne skrives ut.
    let boolean = true;

    //Sjekker at inputfeltene er utfylt. ? Hvis true settes objektet lik innput og errormelding slettes.
    //Hvis false opprettes feilmelding og boolean settes til false.
    if(innAntall != ""){
        antall = innAntall
        $("#errAntall").html(null)
    } else {
        $("#errAntall").html("Du må angi antall!")
        boolean = false
    }

    if(innFornavn != ""){
        fornavn = innFornavn
        $("#errFornavn").html(null)
    } else{
        $("#errFornavn").html("Du må angi Fornavn!")
        boolean = false
    }

    if(innEtternavn != ""){
        etternavn = innEtternavn
        $("#errEtternavn").html(null)
    } else {
        $("#errEtternavn").html("Du må angi Etternavn!")
        boolean = false
    }

    if(innTelefonnr != ""){
        telefonnr = innTelefonnr
        $("#errTelefonnr").html(null)
    } else {
        $("#errTelefonnr").html("Du må angi Telefonnummer!")
        boolean = false
    }

    if(innEpost != ""){
        epost = innEpost
        $("#errEpost").html(null)
    } else {
        $("#errEpost").html("Du må angi epost!")
        boolean = false
    }

    //Oppretter billett dersom alle felter er utfylt. (boolean fremdeles er true.)
    if(boolean) {
        const billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            ePost: epost
        }

        $.post("/lagre", billett, function (data) {
            hentBilletter()
        })
            .fail(function (xhr) {
                const json = $.parseJSON(xhr.responseText);
                $("#danger_feedback").show().html('<strong>Danger!</strong> ' + json.message)
            })
    }
}

function slettBilletter(){
    //Sletter billetter
    $.get("/slette")
    $("#Billettliste").html("<table style='text-align: center; width: 100%'> <tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>")
}

//Formaterer og publiserer returdata fra server.
function formaterData(billetter) {
    let ut = "<table class='table table-striped table-bordered'> <tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr>"
    for (const innBillett of billetter) {
        ut += "<tr><th>" + innBillett.film + "</th><th>" + innBillett.antall + "</th><th>" + innBillett.fornavn + "</th><th>" + innBillett.etternavn + "</th><th>" + innBillett.telefonnr + "</th><th>" + innBillett.ePost + "</th></tr>";
    }
    ut += "</table>"
    $("#Billettliste").html(ut);
}

//Henter billetter fra server
function hentBilletter() {
    $.get("/hent", function (data) {
        formaterData(data);
    })
}