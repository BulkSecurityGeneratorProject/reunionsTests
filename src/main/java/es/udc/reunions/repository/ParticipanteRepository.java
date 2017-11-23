package es.udc.reunions.repository;

import es.udc.reunions.domain.Participante;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Participante entity.
 */
@SuppressWarnings("unused")
public interface ParticipanteRepository extends JpaRepository<Participante,Long> {

    @Query("select participante from Participante participante where participante.user.login = ?#{principal.username}")
    List<Participante> findByUserIsCurrentUser();

    @Query("select participante from Participante participante where participante.user.login <> ?#{principal.username}")
    List<Participante> findByUserIsNotCurrentUser();

    List<Participante> findBySesionId(Long sesionId);

    List<Participante> findByUserId(Long userId);
}
