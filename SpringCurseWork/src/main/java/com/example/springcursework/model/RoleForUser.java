package com.example.springcursework.model;

import jakarta.persistence.*;
@Entity
public class RoleForUser {
    @Id
    @Column(name = "role_id")
    private int roleId;
    @Column(name = "role_name")
    private String roleName;
    @Column(name = "is_selected")
    private boolean isSelected;

    @Column(name = "user_role_id")
    private Integer userRoleId;

    public int getRoleId() {
        return roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public boolean getIsSelected() {
        return isSelected;
    }

    public Integer getUserRoleId() {
        return userRoleId;
    }

    @Override
    public String toString() {
        return "RoleForUser [roleId=" + roleId + ", roleName=" + roleName + ", isSelected=" + isSelected + ", useRoleId=" + userRoleId + "]";
    }

}
