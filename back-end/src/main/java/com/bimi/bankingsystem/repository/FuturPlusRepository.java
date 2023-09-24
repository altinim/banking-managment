package com.bimi.bankingsystem.repository;

import com.bimi.bankingsystem.model.FuturPlus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuturPlusRepository extends JpaRepository<FuturPlus, Long> {
}
