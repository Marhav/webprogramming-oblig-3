package com.example.webprogrammering;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    Logger logger = LoggerFactory.getLogger(BillettRepository.class);

    public boolean lagreBillett(Billett billett){
        String sql = "INSERT INTO BILLETT (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        try{
            db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getePost());
            return true;
        } catch (Exception e){
            logger.error("Feil i kundelagring: " + e);
            return false;
        }
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM BILLETT ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBiletter (){
        String sql = "DELETE FROM BILLETT";
        db.update(sql);
    }
}
