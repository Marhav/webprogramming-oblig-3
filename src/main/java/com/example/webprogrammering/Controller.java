package com.example.webprogrammering;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class Controller {

    @Autowired
    BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett, HttpServletResponse response) throws IOException {
            if(!rep.lagreBillett(innBillett)){
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Vi har fortiden problemer med vår database, prøv igjen senere.");
            }
    }

    @GetMapping("/hent")
    public List<Billett> hentBilletter(){
        try{
            return rep.hentAlleBilletter();

        } catch (Exception e){
            System.out.println("Error i hentBillet i klassen Controller. \nMelding: \n" + e);
        }
        return null;
    }

    @GetMapping("/slette")
    public void deleteBillettArray(){
        try{
            rep.slettAlleBiletter();

        } catch (Exception e){
            System.out.println("Error i deleteBilletArray i klassen Controller. \nMelding: \n" + e);

        }
    }

}
