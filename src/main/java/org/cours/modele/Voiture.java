package org.cours.modele;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull private String marque;
    @NonNull private String modele;
    @NonNull private String couleur;
    @NonNull private String immatricule;
    @NonNull private int annee;
    @NonNull private int prix;

    // TP later links ManyToOne to Proprietaire (then @JsonIgnore to avoid recursion)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietaire")
    @JsonIgnore 
    private Proprietaire proprietaire;
}

