package org.cours.web;

import org.cours.modele.Voiture;
import org.cours.modele.VoitureRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/voitures")
public class VoitureController {

    private final VoitureRepo repo;

    public VoitureController(VoitureRepo repo) {
        this.repo = repo;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Voiture> create(@RequestBody Voiture v) {
        // Ignore client-sent id
        v.setId(null);
        Voiture saved = repo.save(v);
        return ResponseEntity.created(URI.create("/api/voitures/" + saved.getId())).body(saved);
    }

    // READ ALL
    @GetMapping
    public Iterable<Voiture> all() {
        return repo.findAll();
        // If you created the fetch-join method: return repo.findAllWithProprietaire();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Voiture one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Voiture " + id + " introuvable"));
    }

    // UPDATE (full)
    @PutMapping("/{id}")
    public Voiture update(@PathVariable Long id, @RequestBody Voiture incoming) {
        return repo.findById(id).map(existing -> {
            existing.setMarque(incoming.getMarque());
            existing.setModele(incoming.getModele());
            existing.setCouleur(incoming.getCouleur());
            existing.setImmatricule(incoming.getImmatricule());
            existing.setAnnee(incoming.getAnnee());
            existing.setPrix(incoming.getPrix());
            // existing.setProprietaire(...)  // only if you manage owner
            return repo.save(existing);
        }).orElseThrow(() -> new NotFoundException("Voiture " + id + " introuvable"));
    }

    // PATCH (partial)
    @PatchMapping("/{id}")
    public Voiture patch(@PathVariable Long id, @RequestBody Voiture incoming) {
        return repo.findById(id).map(existing -> {
            if (incoming.getMarque() != null) existing.setMarque(incoming.getMarque());
            if (incoming.getModele() != null) existing.setModele(incoming.getModele());
            if (incoming.getCouleur() != null) existing.setCouleur(incoming.getCouleur());
            if (incoming.getImmatricule() != null) existing.setImmatricule(incoming.getImmatricule());
            if (incoming.getAnnee() != 0) existing.setAnnee(incoming.getAnnee());
            if (incoming.getPrix() != 0) existing.setPrix(incoming.getPrix());
            return repo.save(existing);
        }).orElseThrow(() -> new NotFoundException("Voiture " + id + " introuvable"));
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Voiture " + id + " introuvable");
        repo.deleteById(id);
    }

    // --- Simple 404 mapper ---
    @ResponseStatus(HttpStatus.NOT_FOUND)
    static class NotFoundException extends RuntimeException {
        public NotFoundException(String message) { super(message); }
    }
}
		
