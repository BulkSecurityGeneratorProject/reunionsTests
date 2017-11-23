package es.udc.reunions.repository;

import es.udc.reunions.domain.Sesion;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the Sesion entity.
 */
@SuppressWarnings("unused")
public interface SesionRepository extends JpaRepository<Sesion,Long> {

    List<Sesion> findByOrganoId(Long organoId);

    Sesion findTopByOrganoIdOrderByNumeroDesc(Long organoId);

    List<Sesion> findByPrimeraConvocatoriaGreaterThan(ZonedDateTime zonedDateTime);
}
