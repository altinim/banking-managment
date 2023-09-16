package com.bimi.bankingsystem.repository;

import com.bimi.bankingsystem.model.SavingGoal;
import com.bimi.bankingsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {
    public SavingGoal findByUser();
}
