package com.example.springcursework.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LookupItem {
    @Id
    @Column(name = "id")
    private int value;
    @Column(name = "name")
    private String label;

    public String getLabel() { return label; }

    public void setLabel(String label) { this.label = label; }

    @Override
    public String toString() {
        return "LookupItem [value=" + getValue() + ", label=" + label + "]";
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
