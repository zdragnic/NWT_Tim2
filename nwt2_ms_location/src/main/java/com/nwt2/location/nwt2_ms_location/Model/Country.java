package com.nwt2.location.nwt2_ms_location.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * Created by Dragnic on 3/20/2018.
 */
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class,property="@id", scope = Location.class)
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "country_generator")
    @SequenceGenerator(name="country_generator", sequenceName = "country_seq", allocationSize=1)
    private long id;
    @NotNull(message = "Name cannot be null")
    @Size(min = 5, max = 200, message = "Name must be between 5 and 200 characters")
    private String name;

    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Location> locations;

    public Country(){} // JPA only

    public Country(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() { return id; }

    public void setId(long id) { this.id = id; }



    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    @Override
    public String toString() {
        String result = String.format(
                "Country[id=%d, name='%s']%n",
                id, name);
        if (locations != null) {
            for (Location location : locations) {
                result += String.format(
                        "Location[id=%d, name='%s']%n",
                        location.getId(), location.getName());
            }
        }

        return result;
    }
}
