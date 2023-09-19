package com.bimi.bankingsystem.model;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "donation")
public class Donation {
    @Setter(AccessLevel.PROTECTED)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)

    @NonNull
    private long id;
    @NonNull
    private String fullName;
    @NonNull
    private String email;
    @NonNull
    private String phoneNumber;
    @NonNull
    private String address;
    @NonNull
    private double donationAmount;
    @NonNull
    private String cardInformation;
    @NonNull
    private String comment;


}
